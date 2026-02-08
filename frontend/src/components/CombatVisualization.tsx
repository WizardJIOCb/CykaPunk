import React, { useState, useEffect } from 'react';
import { SpineAnimation } from './SpineAnimation';
import { BattleLogEntry, BattleAction } from '../../../shared/types';

interface CombatVisualizationProps {
  battleLog: BattleLogEntry[];
  player1Name: string;
  player2Name: string;
  onBattleEnd?: () => void;
}

export const CombatVisualization: React.FC<CombatVisualizationProps> = ({
  battleLog,
  player1Name,
  player2Name,
  onBattleEnd
}) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player1Animation, setPlayer1Animation] = useState('idle');
  const [player2Animation, setPlayer2Animation] = useState('idle');
  const [battleMessage, setBattleMessage] = useState('');

  // Reset animations when battle starts
  useEffect(() => {
    if (isPlaying) {
      setPlayer1Animation('idle');
      setPlayer2Animation('idle');
      setBattleMessage('Battle started!');
    }
  }, [isPlaying]);

  // Process battle log when playing
  useEffect(() => {
    if (isPlaying && currentTurn < battleLog.length) {
      const currentAction = battleLog[currentTurn];
      setBattleMessage(currentAction.message);

      // Set animations based on action
      if (currentAction.action === BattleAction.ATTACK || 
          currentAction.action === BattleAction.SPECIAL_ATTACK) {
        if (currentAction.actorId === 'player1') {
          setPlayer1Animation('attack');
          setTimeout(() => setPlayer1Animation('idle'), 1000);
        } else {
          setPlayer2Animation('attack');
          setTimeout(() => setPlayer2Animation('idle'), 1000);
        }
      } else if (currentAction.action === BattleAction.DEATH) {
        if (currentAction.actorId === 'player1') {
          setPlayer1Animation('death');
        } else {
          setPlayer2Animation('death');
        }
      }

      // Move to next turn after delay
      const timer = setTimeout(() => {
        setCurrentTurn(prev => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (isPlaying && currentTurn >= battleLog.length) {
      // Battle ended
      setIsPlaying(false);
      if (onBattleEnd) {
        onBattleEnd();
      }
    }
  }, [isPlaying, currentTurn, battleLog, onBattleEnd]);

  const startBattle = () => {
    setCurrentTurn(0);
    setIsPlaying(true);
  };

  const pauseBattle = () => {
    setIsPlaying(false);
  };

  const resetBattle = () => {
    setIsPlaying(false);
    setCurrentTurn(0);
    setPlayer1Animation('idle');
    setPlayer2Animation('idle');
    setBattleMessage('Ready for battle!');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg cyber-border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold terminal-text">{player1Name} vs {player2Name}</h3>
        <div className="flex space-x-2">
          {!isPlaying ? (
            <button 
              className="btn-cyber px-4 py-2"
              onClick={startBattle}
            >
              Start Battle
            </button>
          ) : (
            <button 
              className="btn-cyber px-4 py-2"
              onClick={pauseBattle}
            >
              Pause
            </button>
          )}
          <button 
            className="btn-cyber px-4 py-2"
            onClick={resetBattle}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Battle message display */}
      <div className="bg-gray-900 p-3 rounded mb-4 text-center terminal-text min-h-[3rem] flex items-center justify-center">
        {battleMessage}
      </div>

      {/* Combat Arena */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 h-96 border border-gray-700">
        {/* Player 1 */}
        <div className="absolute left-10 bottom-10 transform -translate-x-1/2">
          <div className="text-center mb-2 terminal-text">{player1Name}</div>
          <SpineAnimation 
            animationName={player1Animation} 
            width={150} 
            height={150} 
          />
        </div>

        {/* VS Badge */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold terminal-text opacity-30">
          VS
        </div>

        {/* Player 2 */}
        <div className="absolute right-10 bottom-10 transform translate-x-1/2">
          <div className="text-center mb-2 terminal-text">{player2Name}</div>
          <SpineAnimation 
            animationName={player2Animation} 
            width={150} 
            height={150} 
          />
        </div>

        {/* Health Bars */}
        <div className="absolute left-10 top-10 w-40">
          <div className="text-sm terminal-text mb-1">{player1Name}'s Health</div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div className="bg-green-600 h-4 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
        <div className="absolute right-10 top-10 w-40">
          <div className="text-sm terminal-text mb-1 text-right">{player2Name}'s Health</div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div className="bg-green-600 h-4 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>

      {/* Turn Counter */}
      <div className="mt-4 text-center terminal-text">
        Turn: {currentTurn} / {battleLog.length}
      </div>

      {/* Battle Log Preview */}
      <div className="mt-4 bg-gray-900 p-3 rounded max-h-32 overflow-y-auto">
        <h4 className="text-sm font-semibold mb-2 terminal-text">Battle Log:</h4>
        {battleLog.slice(Math.max(0, currentTurn - 5), currentTurn).map((entry, index) => (
          <div key={index} className="text-xs text-gray-400">
            Turn {entry.turn}: {entry.message}
          </div>
        ))}
      </div>
    </div>
  );
};