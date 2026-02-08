import React, { useState } from 'react';
import { SpineAnimation } from '../components/SpineAnimation';
import { ChatPanel } from '../components/ChatPanel';

export const ShopScreen: React.FC = () => {
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Basic Sword',
      description: 'A basic sword for beginners',
      type: 'Weapon',
      price: 50,
      currency: 'soft',
      stats: { attack: 5 },
      equipped: false
    },
    {
      id: '2',
      name: 'Leather Armor',
      description: 'Light armor for protection',
      type: 'Armor',
      price: 75,
      currency: 'soft',
      stats: { defense: 3 },
      equipped: false
    },
    {
      id: '3',
      name: 'Health Potion',
      description: 'Restores 50 HP',
      type: 'Consumable',
      price: 25,
      currency: 'soft',
      stats: { health: 50 },
      equipped: false
    },
    {
      id: '4',
      name: 'Advanced Blade',
      description: 'A sharp blade for experienced fighters',
      type: 'Weapon',
      price: 200,
      currency: 'hard',
      stats: { attack: 12 },
      equipped: false
    },
    {
      id: '5',
      name: 'Energy Shield',
      description: 'Provides temporary protection',
      type: 'Armor',
      price: 150,
      currency: 'hard',
      stats: { defense: 8, resistance: 5 },
      equipped: false
    },
    {
      id: '6',
      name: 'Upgrade Crystal',
      description: 'Used to enhance equipment',
      type: 'Material',
      price: 50,
      currency: 'upgrade',
      stats: {},
      equipped: false
    }
  ]);

  const [currencies, setCurrencies] = useState({
    soft: 500,
    hard: 50,
    upgrade: 10
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleBuyItem = (item: any) => {
    if (currencies[item.currency as keyof typeof currencies] >= item.price) {
      // Deduct currency
      const newCurrencies = { ...currencies };
      newCurrencies[item.currency as keyof typeof currencies] -= item.price;
      setCurrencies(newCurrencies);
      
      // Update item as purchased (in a real app, this would update the user's inventory)
      alert(`Successfully purchased ${item.name}!`);
    }
  };

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
                <a className="nav__link nav__link--active" href="#/shop">
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
                  <span className="channel-link__element">Marketplace</span>
                </span>
              </h4>
            </div>
          </div>
          <div className="channel-feed__body">
            <div className="pad">
              <div className="pad__body">
                <div className="slate__title">Marketplace</div>
                <div className="text-paragraph1 mb-4">Welcome to the Night-City marketplace. Browse and purchase items to enhance your character.</div>
                            
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Character Preview */}
                  <div className="lg:col-span-1">
                    <h3 className="text-heading3 mb-4">Your Character</h3>
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-48 h-48 bg-gray-600 rounded-lg flex items-center justify-center border-2 border-cyan-700">
                        <SpineAnimation animationName="idle" width={200} height={200} />
                      </div>
                    </div>
                                
                    <div className="space-y-2">
                      <h3 className="font-medium text-cyan-300">Currencies:</h3>
                      <div className="flex justify-between">
                        <span>Soft Currency:</span>
                        <span className="text-green-400">{currencies.soft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hard Currency:</span>
                        <span className="text-purple-400">{currencies.hard}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Upgrade Currency:</span>
                        <span className="text-yellow-400">{currencies.upgrade}</span>
                      </div>
                    </div>
                  </div>
                              
                  {/* Shop Items */}
                  <div className="lg:col-span-2">
                    <h3 className="text-heading3 mb-4">Items for Sale</h3>
                                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {items.map(item => (
                        <div key={item.id} className="pad">
                          <div className="pad__body">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-white">{item.name}</h3>
                                <p className="text-sm text-gray-300">{item.description}</p>
                                <p className="text-xs text-gray-400 mt-1">Type: {item.type}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-semibold">
                                  {item.price}{' '}
                                  <span className={
                                    item.currency === 'soft' ? 'text-green-400' :
                                    item.currency === 'hard' ? 'text-purple-400' :
                                    'text-yellow-400'
                                  }>
                                    {item.currency.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                            </div>
                                        
                            {Object.keys(item.stats).length > 0 && (
                              <div className="mt-2 text-xs">
                                <span className="text-gray-400">Stats:</span>
                                {Object.entries(item.stats).map(([stat, value]) => (
                                  <span key={stat} className="ml-2 text-cyan-300">
                                    {stat}: {value}
                                  </span>
                                ))}
                              </div>
                            )}
                                        
                            <button 
                              className={`mt-3 w-full py-1 rounded text-sm ${
                                currencies[item.currency as keyof typeof currencies] >= item.price
                                  ? 'button button--primary button--size-lg' :
                                  'bg-gray-600 text-gray-400 cursor-not-allowed'
                              }`}
                              onClick={() => {
                                if (currencies[item.currency as keyof typeof currencies] >= item.price) {
                                  handleBuyItem(item);
                                } else {
                                  alert('Insufficient funds!');
                                }
                              }}
                              disabled={currencies[item.currency as keyof typeof currencies] < item.price}
                            >
                              {currencies[item.currency as keyof typeof currencies] >= item.price ? 'Buy' : 'Insufficient Funds'}
                            </button>
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