import React from 'react'
import styled from 'styled-components'
import moon_sound from '../assets/audio/moon_sound.wav'
import { useTranslation } from 'react-i18next'

export default function Header(props) {
  const { t, i18n } = useTranslation()

  return (
    <StyledField>
      <header>
        <audio src={moon_sound} autoPlay loop />
        <div className="header-wrapper">
          <div className="nick-name">
            <span className="lvl">{props.charInfo?.lvl}</span>
            {props.charInfo?.nickname}
          </div>
          <div className="game-name">{t('moonnymathics')}</div>
          <div className="logout">
            <div className="lang-wrapper">
              <span
                className={i18n.language === 'en' ? 'selected-lng' : null}
                onClick={() => i18n.changeLanguage('en')}
              >
                En
              </span>
              <span className="selected-lng"> / </span>
              <span
                className={i18n.language === 'ukr' ? 'selected-lng' : null}
                onClick={() => i18n.changeLanguage('ukr')}
              >
                Ukr{' '}
              </span>
            </div>
            <span onClick={props.logoutHandler}>
              {props.charInfo?.nickname ? t('logout') : null}
            </span>
          </div>
        </div>
      </header>
    </StyledField>
  )
}

const StyledField = styled.div`
  .lang-wrapper {
    display: inline-block;
    margin-right: 20px;
    color: var(--common);
    & span {
      cursor: pointer;
    }
    .selected-lng {
      color: var(--main);
    }
  }

  .header-wrapper {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    font-size: 26px;
    font-weight: 400;
  }

  .lvl {
    border-radius: 50%;
    display: inline-block;
    height: 20px;
    width: 20px;
    margin: 0 15px;
  }

  .game-name {
    font-size: 40px;
  }

  .logout {
    cursor: pointer;
    margin: 0 15px;
  }

  @media (max-width: 960px) {
    .game-name {
      display: none;
    }
  }
`
