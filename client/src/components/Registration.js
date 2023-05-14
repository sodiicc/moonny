import React, { useState, useEffect } from 'react'
import Header from './Header'
import { post, login } from './_api/Requests'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import Images from './Images'
// eslint-disable-next-line no-unused-vars
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

function Registration(props) {
  const [t] = useTranslation()

  const dispatch = useDispatch()

  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    window.onkeypress = onEnter
    setError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password, isRegister])

  const registerHandler = () => {
    if (username.length < 4) {
      setError(t('error_name_length'))
      return
    }
    if (password.length < 6) {
      setError(t('error_pass_length'))
      return
    }
    if (password === confPassword) {
      post('register', { username, password }).then((res) => {
        if (res.status === 200) setIsRegister(false)
      })
    } else setError(t('enter_pass'))
  }

  const loginHandler = () => {
    login({ username, password }).then((res) => {
      if (res.token) {
        window.onkeypress = null
        dispatch({ type: 'SET_LOGIN', payload: true })
        dispatch({ type: 'SET_NAME', payload: username })
        dispatch({ type: 'SET_TOKEN', payload: res.token })
        localStorage.setItem('username', res.username)
        localStorage.setItem('token', res.token)
        props.history.push('/game')
      } else setError('Username or password is wrong')
    })
  }

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      isRegister ? registerHandler() : loginHandler()
    }
  }
  return (
    <StyledField>
      <Header info={{ lvl: '', name: '' }} />
      <div className="container">
        <div className="char-motion"></div>
        <div className="weapon-motion"></div>
        <div className="boss-motion"></div>
        <div className="armor-motion"></div>
        <span className="task1">2+2=?</span>
        <span className="task2">8:4+2=?</span>
        <span className="task3">8:x+2=6</span>
        <Row justify="center">
          <Col md={{ span: 24 }}>
            <div className="login-form">
              <div className="error-login">{error}</div>
              <div>
                <span
                  className={isRegister ? 'active-btn' : 'login-btn'}
                  onClick={() => setIsRegister(true)}
                >
                  {t('register')}
                </span>
                <span
                  className={isRegister ? 'login-btn' : 'active-btn'}
                  onClick={() => setIsRegister(false)}
                >
                  {t('login')}
                </span>
              </div>
              {isRegister ? (
                <form>
                  <div className="login">
                    <span>{t('login')}</span>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      type="text"
                      placeholder={t('enter_name')}
                      className="username"
                      name="username"
                    />
                  </div>
                  <div className="pass">
                    <span>{t('password')}</span>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      placeholder={t('enter_pass')}
                      className="password"
                      name="password"
                    />
                  </div>
                  <div className="pass">
                    <span>{t('confirm')}</span>
                    <input
                      onChange={(e) => setConfPassword(e.target.value)}
                      value={confPassword}
                      type="password"
                      placeholder={t('enter_pass')}
                      className="password"
                      name="password"
                    />
                  </div>
                  <span className="login-btn" onClick={registerHandler}>
                    {t('register')}
                  </span>
                </form>
              ) : (
                <form>
                  <div className="login">
                    <span>{t('login')}</span>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      type="text"
                      placeholder={t('enter_name')}
                      className="username"
                      name="username"
                    />
                  </div>
                  <div className="pass">
                    <span>{t('password')}</span>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      placeholder={t('enter_pass')}
                      className="password"
                      name="password"
                    />
                  </div>
                  <span className="login-btn mt-5" onClick={loginHandler}>
                    {t('login')}
                  </span>
                </form>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </StyledField>
  )
}

export default Registration

const StyledField = styled.div`
  .boss-motion {
    position: absolute;
    width: 200px;
    height: 270px;
    background: url(${Images.boss_1}) no-repeat;
    background-size: contain;
    z-index: -1;
    top: 15vh;
    left: 70vw;
    animation: charReverseAnime 63s infinite linear;
    transform: rotate(0deg) translate(0, 0);
  }

  .weapon-motion {
    position: absolute;
    width: 200px;
    height: 270px;
    background: url(${Images.weapon_gold}) no-repeat;
    background-size: contain;
    z-index: -1;
    top: calc(98vh);
    left: calc(98vw);
    animation: charReverseAnime 42s infinite linear;
    transform: rotate(0deg) translate(-110%, -120%);
  }

  .char-motion {
    position: absolute;
    top: 15vh;
    left: 5vw;
    width: 250px;
    height: 350px;
    background: url(${Images.main_animate}) no-repeat;
    background-size: contain;
    z-index: -1;
    animation: charAnime 79s infinite linear;
    transform: rotate(0deg) translate(0, 0);
  }

  .armor-motion {
    position: absolute;
    top: calc(98vh);
    left: 5vw;
    width: 150px;
    height: 230px;
    background: url(${Images.armor_platinum}) no-repeat;
    background-size: contain;
    z-index: -1;
    animation: charAnime 55s infinite linear;
    transform: rotate(0deg) translate(0, -110%);
  }

  .task1 {
    color: var(--main);
    font-size: 60px;
    position: absolute;
    top: calc(78vh);
    left: 40vw;
    z-index: -1;
    animation: charAnime 35s infinite linear;
    transform: rotate(-30deg);
  }

  .task2 {
    color: var(--uncommon);
    font-size: 52px;
    position: absolute;
    top: calc(38vh - 70px);
    left: 70vw;
    z-index: -1;
    animation: charReverseAnime 38s infinite linear;
    transform: rotate(-5deg);
  }

  .task3 {
    color: var(--warning);
    font-size: 48px;
    position: absolute;
    top: calc(98vh);
    left: 60vw;
    z-index: -1;
    animation: charAnime 96s infinite linear;
    transform: rotate(10deg) translate(0, -110%);
  }

  .task1,
  .task2,
  .task3 {
    letter-spacing: 14px;
    text-shadow: 2px 2px 10px var(--secondary);
  }

  @media (max-width: 960px) {
    .boss-motion,
    .char-motion,
    .armor-motion,
    .weapon-motion {
      width: 100px;
      height: 140px;
    }

    .task1,
    .task2,
    .task3 {
      font-size: 36px;
      letter-spacing: 10px;
    }
  }
`
