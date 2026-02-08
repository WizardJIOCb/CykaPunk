import React from 'react';
import { ChatPanel } from '../components/ChatPanel';

export const LocationScreen: React.FC = () => {
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
                <a className="nav__link nav__link--active" href="#/location">
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
                  <span className="channel-link__element">World Map</span>
                </span>
              </h4>
            </div>
          </div>
          <div className="channel-feed__body">
            <div className="pad">
              <div className="pad__body">
                <div className="slate__title">World Map</div>
                <div className="text-paragraph1 mb-4">Explore the world of CykaPunk and navigate to different locations.</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Current Location */}
                  <div className="pad">
                    <div className="pad__body">
                      <h3 className="text-heading3 mb-4">Current Location</h3>
                      <div className="flex flex-col items-center">
                        <div className="w-full h-64 bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-center">
                            <h3 className="text-2xl font-bold text-cyan-300">Neon City Center</h3>
                            <p className="text-gray-400 mt-2">Population: 2,847 residents online</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-600 p-3 rounded">
                          <p className="text-sm text-gray-300">Welcome to the heart of CykaPunk city. This is the central hub where players gather, trade, and prepare for battles.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Nearby Locations */}
                  <div className="pad">
                    <div className="pad__body">
                      <h3 className="text-heading3 mb-4">Nearby Locations</h3>
                      <div className="space-y-3">
                        {[{
                          name: 'Market District', population: '1,203', danger: 'Low'
                        },
                        {
                          name: 'Industrial Zone', population: '567', danger: 'Medium'
                        },
                        {
                          name: 'Slums', population: '892', danger: 'High'
                        },
                        {
                          name: 'Corporate Tower', population: '342', danger: 'Very High'
                        },
                        {
                          name: 'Underground', population: '210', danger: 'Extreme'
                        }].map((location, index) => (
                          <div key={index} className="flex justify-between items-center bg-gray-600 p-3 rounded hover:bg-gray-500 transition-colors cursor-pointer">
                            <div>
                              <h3 className="font-medium text-white">{location.name}</h3>
                              <p className="text-xs text-gray-400">Players: {location.population}</p>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-semibold ${
                              location.danger === 'Low' ? 'bg-green-800 text-green-200' :
                              location.danger === 'Medium' ? 'bg-yellow-800 text-yellow-200' :
                              location.danger === 'High' ? 'bg-orange-800 text-orange-200' :
                              location.danger === 'Very High' ? 'bg-red-800 text-red-200' :
                              'bg-purple-800 text-purple-200'
                            }`}>
                              {location.danger}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Local Events */}
                <div className="mt-6 pad">
                  <div className="pad__body">
                    <h3 className="text-heading3 mb-4">Local Events</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-600 rounded">
                        <h3 className="font-medium text-cyan-300">Daily Quest Available</h3>
                        <p className="text-sm text-gray-300">Help the locals repair the broken energy grid in Industrial Zone</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-green-400">Reward: 150 Soft Currency</span>
                          <button className="button button--primary button--size-lg text-xs">Accept</button>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-600 rounded">
                        <h3 className="font-medium text-cyan-300">PvP Tournament</h3>
                        <p className="text-sm text-gray-300">Weekly tournament begins in 2 hours at the Arena</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-yellow-400">Entry Fee: 50 Hard Currency</span>
                          <button className="button button--primary button--size-lg text-xs">Register</button>
                        </div>
                      </div>
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