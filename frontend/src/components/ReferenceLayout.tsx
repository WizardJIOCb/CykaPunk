import React from 'react';
import { Link, Route, Switch } from 'wouter';
import { CharacterScreen } from '../pages/CharacterScreen';
import { LocationScreen } from '../pages/LocationScreen';
import { ShopScreen } from '../pages/ShopScreen';
import { BattleScreen } from '../pages/BattleScreen';
import { ChatPanel } from './ChatPanel';

interface ReferenceLayoutProps {
  children?: React.ReactNode;
}

export const ReferenceLayout: React.FC<ReferenceLayoutProps> = ({ children }) => {
  // If children are passed, render them instead of the default reference layout
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="app-container">
      <div className="app-a">
        <div className="segment-topbar">
          <div className="segment-topbar__header">
            <h3 className="segment-topbar__title">
              Messages
            </h3>
          </div>
          <div className="segment-topbar__aside">
            <div className="button-toolbar">
              <a className="button button--primary button--size-lg">
                <svg className="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
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
                <svg className="form-control__addon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
                </svg>
              </div>
            </div>
          </div>
        </form>

        <div className="nav-section">
          <div className="nav-section__header">
            <h2 className="nav-section__title">Feeds</h2>
          </div>
          <div className="nav-section__body">
            <ul className="nav">
              <li className="nav__item">
                <Link className="nav__link nav__link--active" to="/messages/watson">
                  <span className="channel-link">
                    <span className="channel-link__icon">#</span>
                    <span className="channel-link__element">Watson</span>
                  </span>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/messages/afterlife">
                  <span className="channel-link channel-link--unread">
                    <span className="channel-link__icon">#</span>
                    <span className="channel-link__element">Afterlife</span>
                    <span className="channel-link__element">
                      <span className="badge">3</span>
                    </span>
                  </span>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/messages/ncpd-gigs">
                  <span className="channel-link">
                    <span className="channel-link__icon">#</span>
                    <span className="channel-link__element">NCPD-Gigs</span>
                  </span>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/messages/pacifica">
                  <span className="channel-link">
                    <span className="channel-link__icon">#</span>
                    <span className="channel-link__element">Pacifica</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-section__header">
            <h2 className="nav-section__title">Direct</h2>
          </div>
          <div className="nav-section__body">
            <ul className="nav">
              <li className="nav__item">
                <Link className="nav__link" to="/direct/rogue">
                  <span className="conversation-link conversation-link--online conversation-link--unread">
                    <span className="conversation-link__icon"></span>
                    <span className="conversation-link__element">Rogue Amendiares</span>
                    <span className="conversation-link__element">
                      <span className="badge">5</span>
                    </span>
                  </span>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/direct/takemura">
                  <span className="conversation-link conversation-link--online">
                    <span className="conversation-link__icon"></span>
                    <span className="conversation-link__element">Takemura</span>
                    <span className="conversation-link__element">
                      <span className="badge">1</span>
                    </span>
                  </span>
                </Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" to="/direct/wakado">
                  <span className="conversation-link">
                    <span className="conversation-link__icon"></span>
                    <span className="conversation-link__element">Wakado O., Regina Jones</span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="app-main">
        <div className="channel-feed">
          <div className="segment-topbar">
            <div className="segment-topbar__header">
              <span className="segment-topbar__overline">
                NetWire_Seed: d869db7fe62fb07c25a0403ecaea55031744b5fb
              </span>
              <h4 className="segment-topbar__title">
                <span className="channel-link">
                  <span className="channel-link__icon">#</span>
                  <span className="channel-link__element">Watson</span>
                </span>
              </h4>
            </div>
            <div className="segment-topbar__aside">
              <div className="button-toolbar">
                <a className="button button--default">
                  <svg className="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 9.5c2.481 0 4.5 1.571 4.5 3.503 0 1.674-1.703 3.48-4.454 3.48-.899 0-1.454-.156-2.281-.357-.584.358-.679.445-1.339.686.127-.646.101-.924.081-1.56-.583-.697-1.007-1.241-1.007-2.249 0-1.932 2.019-3.503 4.5-3.503zm0-1.5c-3.169 0-6 2.113-6 5.003 0 1.025.37 2.032 1.023 2.812.027.916-.511 2.228-.997 3.184 1.302-.234 3.15-.754 3.989-1.268.709.173 1.388.252 2.03.252 3.542 0 5.954-2.418 5.954-4.98.001-2.906-2.85-5.003-5.999-5.003zm-.668 6.5h-1.719v-.369l.938-1.361v-.008h-.869v-.512h1.618v.396l-.918 1.341v.008h.95v.505zm3.035 0h-2.392v-.505l1.306-1.784v-.011h-1.283v-.7h2.25v.538l-1.203 1.755v.012h1.322v.695zm-10.338 9.5c-.615-1.001-.947-2.159-.947-3.342 0-3.018 2.197-5.589 5.261-6.571-.472-1.025-1.123-1.905-2.124-2.486-.644-.374-1.041-1.07-1.04-1.82v-.003c0-1.173-.939-2.123-2.097-2.123s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h9.782c.425-.834.931-1.764 1.165-2.655zm-.947-15.345c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1z" />
                  </svg>
                </a>
                <a className="button button--default">
                  <svg className="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M6 16h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2zm13-7h-6v-3h6v3zm-2-5v-5h-2v5h2zm-2 7v10h2v-10h-2zm13 3h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2z" />
                  </svg>
                </a>
                <a className="button button--default">
                  <svg className="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="channel-feed__body">
            <div className="message">
              <div className="message__body">
                <div>
                  I got a gig lined up in Watson, no biggie. If you prove useful, expect more side gigs coming your way. I need a half-decent netrunner. Hit me up, provide credentials, eddies on completion.
                </div>
              </div>
              <div className="message__footer">
                <span className="message__authoring">V. M. Vargas</span>
                {" - 11:04pm"}
              </div>
            </div>
            <div className="message">
              <div className="message__body">
                <div>
                  Meet me at the Afterlife club in Watson. Come alone, bring your best hacking gear. We'll see if you're worth V's time.
                </div>
              </div>
              <div className="message__footer">
                <span className="message__authoring">V. M. Vargas</span>
                {" - 11:15pm"}
              </div>
            </div>
          </div>
          <div className="channel-feed__footer">
            <form
              className="channel-message-form"
              action="#"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-group">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <div className="form-control">
                  <textarea
                    id="message"
                    className="form-control"
                    name="message"
                  ></textarea>
                </div>
              </div>
              <div className="form-footer">
                <button className="button button--primary button--size-xl" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="app-b">
        <div className="pad">
          <h4 className="text-heading3">What's this?</h4>
          <p className="text-paragraph1">
            A <em>fake</em> Slack or Discord type of app inspired by Cyberpunk
            2077. This app is static, eg. not implementing much logic.
          </p>
          <p className="text-paragraph1">
            The goal is: showcasing a start of a UI kit. If you've played the
            game, you' might be able to pick-up some similarities with the
            in-game menus.
          </p>
        </div>
      </div>
    </div>
  );
};