import React from 'react';
import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { ReferenceLayout } from './components/ReferenceLayout';
import { CharacterScreen } from './pages/CharacterScreen';
import { LocationScreen } from './pages/LocationScreen';
import { ShopScreen } from './pages/ShopScreen';
import { BattleScreen } from './pages/BattleScreen';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-skeleton">
        <header className="app-header">
          <div className="app-header__anchor">
            <span className="app-header__anchor__text">
              CykaPunk - NetWire
            </span>
          </div>

          <nav>
            <ul className="nav">
              <li className="nav__item"><a className="nav__link nav__link--active" href="#/"><span className="nav__link__element">Home</span></a></li>
              <li className="nav__item"><a className="nav__link" href="#/messages"><span className="nav__link__element">Messages</span><span className="nav__link__element"><span className="badge">11</span></span></a></li>
              <li className="nav__item"><a className="nav__link" href="#/shop"><span className="nav__link__element">Shop</span></a></li>
              <li className="nav__item"><a className="nav__link" href="#/map"><span className="nav__link__element">Map</span></a></li>
              <li className="nav__item"><a className="nav__link" href="#/files"><span className="nav__link__element">Files</span></a></li>
            </ul>
          </nav>
        </header>

        <div className="app-container">
          {/* Left Sidebar (Navigation) */}
          <div className="app-a">
            <div className="segment-topbar">
              <div className="segment-topbar__header">
                <h3 className="segment-topbar__title">Messages</h3>
              </div>
              <div className="segment-topbar__aside">
                <div className="button-toolbar">
                  <a className="button button--primary button--size-lg">
                    <svg className="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <div className="form-control form-control--with-addon">
                  <input name="query" placeholder="Search..." type="text" />
                  <div className="form-control__addon form-control__addon--prefix">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </form>

            <nav className="nav-section nav-section--active" id="navigation-sidebar">
              <div className="nav-section__header">
                <h2 className="nav-section__title">Game Sections</h2>
              </div>
              <div className="nav-section__body">
                <ul className="nav">
                  <li className="nav__item"><a className="nav__link" href="#/character"><span className="nav__link__element">Character</span></a></li>
                  <li className="nav__item"><a className="nav__link" href="#/inventory"><span className="nav__link__element">Inventory</span></a></li>
                  <li className="nav__item"><a className="nav__link" href="#/equipment"><span className="nav__link__element">Equipment</span></a></li>
                  <li className="nav__item"><a className="nav__link" href="#/skills"><span className="nav__link__element">Skills</span></a></li>
                  <li className="nav__item"><a className="nav__link" href="#/quests"><span className="nav__link__element">Quests</span></a></li>
                </ul>
              </div>
            </nav>

            <nav className="nav-section">
              <div className="nav-section__header">
                <h2 className="nav-section__title">Combat</h2>
              </div>
              <div className="nav-section__body">
                <ul className="nav">
                  <li className="nav__item"><a className="nav__link nav__link--active" href="#/battles/pve"><span className="nav__link__element">PvE Arena</span></a></li>
                  <li className="nav__item"><a className="nav__link" href="#/battles/pvp"><span className="nav__link__element">PvP Arena</span></a></li>
                  <li className="nav__item"><a className="nav__link" href="#/battles/boss"><span className="nav__link__element">Boss Battles</span></a></li>
                </ul>
              </div>
            </nav>

            <nav className="nav-section">
              <div className="nav-section__header">
                <h2 className="nav-section__title">Social</h2>
              </div>
              <div className="nav-section__body">
                <ul className="nav">
                  <li className="nav__item"><a className="nav__link" href="#/friends"><span className="nav__link__element">Friends</span></a></li>
                  <li className="nav__item"><a className="nav__link" href="#/guilds"><span className="nav__link__element">Guilds</span></a></li>
                  <li className="nav__item"><a className="nav__link" href="#/chat"><span className="nav__link__element">Chat Rooms</span></a></li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="app-main">
            <div className="channel-feed">
              <div className="segment-topbar">
                <div className="segment-topbar__header">
                  <span className="segment-topbar__overline">NetWire_Seed: d869db7fe62fb07c25a0403ecaea55031744b5fb</span>
                  <h4 className="segment-topbar__title">CykaPunk Dashboard</h4>
                </div>
                <div className="segment-topbar__aside">
                  <div className="button-toolbar">
                    <a className="button button--default">
                      <svg className="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M18 9.5c2.481 0 4.5 1.571 4.5 3.503 0 1.674-1.703 3.48-4.454 3.48-.899 0-1.454-.156-2.281-.357-.584.358-.679.445-1.339.686.127-.646.101-.924.081-1.56-.583-.697-1.007-1.241-1.007-2.249 0-1.932 2.019-3.503 4.5-3.503zm0-1.5c-3.169 0-6 2.113-6 5.003 0 1.025.37 2.032 1.023 2.812.027.916-.511 2.228-.997 3.184 1.302-.234 3.15-.754 3.989-1.268.709.173 1.388.252 2.03.252 3.542 0 5.954-2.418 5.954-4.98.001-2.906-2.85-5.003-5.999-5.003zm-.668 6.5h-1.719v-.369l.938-1.361v-.008h-.869v-.512h1.618v.396l-.918 1.341v.008h.95v.505zm3.035 0h-2.392v-.505l1.306-1.784v-.011h-1.283v-.7h2.25v.538l-1.203 1.755v.012h1.322v.695zm-10.338 9.5c1.578 0 2.971-1.402 2.971-3h-6c0 1.598 1.45 3 3.029 3zm.918-7.655c-.615-1.001-.947-2.159-.947-3.342 0-3.018 2.197-5.589 5.261-6.571-.472-1.025-1.123-1.905-2.124-2.486-.644-.374-1.041-1.07-1.04-1.82v-.003c0-1.173-.939-2.123-2.097-2.123s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h9.782c.425-.834.931-1.764 1.165-2.655zm-.947-15.345c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1z"></path>
                      </svg>
                    </a>
                    <a className="button button--default">
                      <svg className="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M6 16h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2zm13-7h-6v-3h6v3zm-2-5v-5h-2v5h2zm-2 7v10h2v-10h-2zm13 3h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2z"></path>
                      </svg>
                    </a>
                    <a className="button button--default">
                      <svg className="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="channel-feed__body">
                <Switch>
                  <Route path="/character">
                    <CharacterScreen />
                  </Route>
                  <Route path="/location">
                    <LocationScreen />
                  </Route>
                  <Route path="/shop">
                    <ShopScreen />
                  </Route>
                  <Route path="/battles">
                    <BattleScreen />
                  </Route>
                  <Route path="/">
                    <div className="message">
                      <div className="message__body">
                        <div>
                          Welcome to CykaPunk, netrunner. The year is 2077, and Night City is yours to explore. Access your character panel to begin your journey through the streets of this sprawling metropolis. Complete jobs, upgrade your gear, and become the ultimate cyber-enhanced warrior.
                        </div>
                      </div>
                      <div className="message__footer">
                        <span className="message__authoring">System</span> - Just now
                      </div>
                    </div>

                    <div className="message">
                      <div className="message__body">
                        <div>
                          Your character has been created with basic equipment. Visit the Shop to purchase upgrades or visit the Combat Arena to test your skills against other netrunners.
                        </div>
                      </div>
                      <div className="message__footer">
                        <span className="message__authoring">System</span> - Just now
                      </div>
                    </div>
                  </Route>
                </Switch>
              </div>

              <div className="channel-feed__footer">
                <form className="channel-message-form" action="#" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Command</label>
                    <div className="form-control">
                      <textarea id="message" className="form-control" name="message" placeholder="Enter game command..."></textarea>
                    </div>
                  </div>
                  <div className="form-footer">
                    <button className="button button--primary" type="submit">Execute</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Chat Panel) */}
          <div className="app-b">
            <div className="pad">
              <h4 className="text-heading3">Game Status</h4>
              <p className="text-paragraph1">
                <strong>Level:</strong> 1<br />
                <strong>Health:</strong> 100/100<br />
                <strong>Stamina:</strong> 50/50<br />
                <strong>Currency:</strong> 500 eddies
              </p>
              
              <h4 className="text-heading3" style={{ marginTop: '1rem' }}>Active Quests</h4>
              <p className="text-paragraph1">No active quests</p>
              
              <h4 className="text-heading3" style={{ marginTop: '1rem' }}>Recent Activity</h4>
              <p className="text-paragraph1">
                Character created<br />
                Basic equipment acquired
              </p>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;