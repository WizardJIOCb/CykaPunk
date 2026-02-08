import React from 'react';
import { SpineAnimation } from '../components/SpineAnimation';
import { CurrencyDisplay } from '../components/CurrencyDisplay';
import { ChatPanel } from '../components/ChatPanel';

export const CharacterScreen: React.FC = () => {
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
                <a className="nav__link" href="#/battles">
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
                  <span className="channel-link__element">Character Management</span>
                </span>
              </h4>
            </div>
          </div>
          <div className="channel-feed__body">
            <div className="pad">
              <div className="pad__body">
                <div className="slate__title">Character Management</div>
                <div className="text-paragraph1 mb-4">View and manage your character's stats, equipment, and abilities.</div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Character Stats */}
                  <div className="lg:col-span-1">
                    <h3 className="text-heading3 mb-4">Character Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Level:</span>
                        <span className="text-cyan-400">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="text-cyan-400">0/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Health:</span>
                        <span className="text-cyan-400">100/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attack:</span>
                        <span className="text-cyan-400">10</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Defense:</span>
                        <span className="text-cyan-400">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span className="text-cyan-400">8</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <h3 className="text-sm font-semibold mb-2 text-cyan-300">Currencies</h3>
                      <CurrencyDisplay 
                        currencies={{
                          soft: 1500,
                          hard: 75,
                          upgrade: 25
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Character Preview */}
                  <div className="lg:col-span-2 flex flex-col items-center">
                    <h3 className="text-heading3 mb-4">Character Preview</h3>
                    <div className="w-full max-w-md">
                      <SpineAnimation animationName="idle" width={400} height={400} />
                    </div>
                    
                    {/* Animation Controls */}
                    <div className="mt-4 w-full flex flex-wrap justify-center gap-2">
                      {['idle', 'walk', 'run', 'shoot', 'attack', 'jump', 'death'].map((anim) => (
                        <button 
                          key={anim}
                          className="button button--primary button--size-lg"
                        >
                          {anim.charAt(0).toUpperCase() + anim.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Equipment Slots */}
                <div className="mt-6 pad">
                  <div className="pad__body">
                    <h3 className="text-heading3 mb-4">Equipment</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
                      {['Head', 'Torso', 'Right Hand', 'Left Hand', 'Belt', 'Pants', 'Boots'].map((slot) => (
                        <div key={slot} className="flex flex-col items-center">
                          <span className="text-xs text-gray-400 mb-2">{slot}</span>
                          <div className="w-16 h-16 bg-gray-600 rounded border-2 border-dashed border-gray-500 flex items-center justify-center">
                            <span className="text-xs text-gray-500">Empty</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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