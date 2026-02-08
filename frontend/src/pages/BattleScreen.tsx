import React, { useState } from 'react';
import { CombatVisualization } from '../components/CombatVisualization';
import { BattleAction } from '../../../shared/types';
import { ChatPanel } from '../components/ChatPanel';

export const BattleScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pvp' | 'boss'>('pvp');

  return (
    <div className="app-container">
      <div className="app-a">
        <div className="segment-topbar">
          <div className="segment-topbar__header">
            <h3 className="segment-topbar__title">
              Navigation
            </h3>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-section__header">
            <h2 className="nav-section__title">Game Menu</h2>
          </div>
          <div className="nav-section__body">
            <ul className="nav">
              <li className="nav__item">
                <a className="nav__link" href="#/character">
                  <span className="channel-link">
                    <span className="channel-link__icon">&gt;</span>
                    <span className="channel-link__element">Character</span>
                  </span>
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#/location">
                  <span className="channel-link">
                    <span className="channel-link__icon">&gt;</span>
                    <span className="channel-link__element">Location</span>
                  </span>
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link" href="#/shop">
                  <span className="channel-link">
                    <span className="channel-link__icon">&gt;</span>
                    <span className="channel-link__element">Shop</span>
                  </span>
                </a>
              </li>
              <li className="nav__item">
                <a className="nav__link nav__link--active" href="#/battles">
                  <span className="channel-link">
                    <span className="channel-link__icon">&gt;</span>
                    <span className="channel-link__element">Battles</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-section__header">
            <h2 className="nav-section__title">System Status</h2>
          </div>
          <div className="nav-section__body">
            <div className="text-xs space-y-1">
              <div className="flex justify-between">
                <span>CPU:</span>
                <span className="text-green-400">78%</span>
              </div>
              <div className="flex justify-between">
                <span>MEM:</span>
                <span className="text-yellow-400">56%</span>
              </div>
              <div className="flex justify-between">
                <span>NET:</span>
                <span className="text-green-400">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="app-main">
        <div className="channel-feed">
          <div className="segment-topbar">
            <div className="segment-topbar__header">
              <h4 className="segment-topbar__title">
                <span className="channel-link">
                  <span className="channel-link__icon">&gt;</span>
                  <span className="channel-link__element">Combat Arena</span>
                </span>
              </h4>
            </div>
          </div>
          <div className="channel-feed__body">
            <div className="pad">
              <div className="pad__body">
                <div className="slate__title">Combat Arena</div>
                <div className="text-paragraph1 mb-4">Engage in PvP battles or challenge powerful bosses in the arena.</div>
                
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-700 mb-6">
                  <button
                    className={`py-2 px-4 font-medium ${
                      activeTab === 'pvp'
                        ? 'text-cyan-400 border-b-2 border-cyan-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('pvp')}
                  >
                    PvP Battles
                  </button>
                  <button
                    className={`py-2 px-4 font-medium ${
                      activeTab === 'boss'
                        ? 'text-cyan-400 border-b-2 border-cyan-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => setActiveTab('boss')}
                  >
                    Boss Arena
                  </button>
                </div>
                
                <div className="space-y-6">
                  {activeTab === 'pvp' ? (
                    <>
                      <div className="pad">
                        <div className="pad__body">
                          <h3 className="text-heading3 mb-4">Find Opponent</h3>
                          <div className="flex flex-col items-center">
                            <div className="w-full max-w-3xl">
                              <CombatVisualization 
                                battleLog={[{
                                  turn: 1,
                                  actorId: 'player1',
                                  action: BattleAction.ATTACK,
                                  targetId: 'player2',
                                  damage: 10,
                                  message: 'Player1 attacks Player2 for 10 damage!'
                                }, {
                                  turn: 2,
                                  actorId: 'player2',
                                  action: BattleAction.ATTACK,
                                  targetId: 'player1',
                                  damage: 8,
                                  message: 'Player2 counterattacks for 8 damage!'
                                }, {
                                  turn: 3,
                                  actorId: 'player1',
                                  action: BattleAction.CRITICAL_HIT,
                                  targetId: 'player2',
                                  damage: 25,
                                  message: 'Player1 lands a critical hit!'
                                }, {
                                  turn: 4,
                                  actorId: 'player2',
                                  action: BattleAction.DEATH,
                                  targetId: 'player2',
                                  message: 'Player2 has been defeated!'
                                }]}
                                player1Name="You"
                                player2Name="Opponent"
                              />
                            </div>
                            <div className="mt-4 flex space-x-4">
                              <button className="button button--primary button--size-lg">
                                Search for PvP Match
                              </button>
                              <button className="button button--primary button--size-lg">
                                Quick Battle
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="pad">
                          <div className="pad__body">
                            <h3 className="text-heading3 mb-3">Battle History</h3>
                            <div className="space-y-2">
                              {[1, 2, 3].map(i => (
                                <div key={i} className="p-2 bg-gray-600 rounded text-sm">
                                  <div className="flex justify-between">
                                    <span>Battle #{i}</span>
                                    <span className="text-green-400">Victory</span>
                                  </div>
                                  <div className="text-xs text-gray-400">vs Player{i} - 2 mins ago</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="pad">
                          <div className="pad__body">
                            <h3 className="text-heading3 mb-3">Statistics</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Wins:</span>
                                <span className="text-green-400">5</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Losses:</span>
                                <span className="text-red-400">2</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Win Rate:</span>
                                <span className="text-cyan-400">71%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Battles:</span>
                                <span>7</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="pad">
                        <div className="pad__body">
                          <h3 className="text-heading3 mb-4">Boss Arena</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-heading3 mb-3">Arena 1: Street Rats (1-10)</h3>
                              <div className="space-y-2">
                                {Array.from({ length: 10 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`p-2 rounded flex justify-between items-center ${
                                      i < 3 ? 'bg-green-900/30 border border-green-700' : 'bg-gray-600'
                                    }`}
                                  >
                                    <span>Boss {i + 1}: Street Rat {i + 1}</span>
                                    {i < 3 && <span className="text-green-400 text-xs">DEFEATED</span>}
                                    {i === 3 && <span className="text-yellow-400 text-xs">CURRENT</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-heading3 mb-3">Arena 2: Corporate Security (11-20)</h3>
                              <div className="space-y-2">
                                {Array.from({ length: 10 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className={`p-2 rounded flex justify-between items-center ${
                                      i < 0 ? 'bg-green-900/30 border border-green-700' : 'bg-gray-600'
                                    }`}
                                  >
                                    <span>Boss {i + 11}: Corp Guard {i + 1}</span>
                                    {i < 0 && <span className="text-green-400 text-xs">DEFEATED</span>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pad">
                          <div className="pad__body">
                            <h3 className="text-heading3 mb-3">Current Challenge</h3>
                            <div className="flex flex-col items-center">
                              <div className="w-full max-w-3xl">
                                <CombatVisualization 
                                  battleLog={[{
                                    turn: 1,
                                    actorId: 'player1',
                                    action: BattleAction.ATTACK,
                                    targetId: 'boss1',
                                    damage: 15,
                                    message: 'You attack the Street Rat Alpha for 15 damage!'
                                  }, {
                                    turn: 2,
                                    actorId: 'boss1',
                                    action: BattleAction.ATTACK,
                                    targetId: 'player1',
                                    damage: 8,
                                    message: 'Street Rat Alpha claws you for 8 damage!'
                                  }, {
                                    turn: 3,
                                    actorId: 'player1',
                                    action: BattleAction.SPECIAL_ATTACK,
                                    targetId: 'boss1',
                                    damage: 25,
                                    message: 'You unleash a special attack!'
                                  }, {
                                    turn: 4,
                                    actorId: 'boss1',
                                    action: BattleAction.DEATH,
                                    targetId: 'boss1',
                                    message: 'Street Rat Alpha has been defeated!'
                                  }]}
                                  player1Name="You"
                                  player2Name="Street Rat Alpha"
                                />
                              </div>
                              <button className="mt-4 button button--primary button--size-lg">
                                Challenge Boss
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="app-b">
        <ChatPanel />
      </div>
    </div>
  );
};