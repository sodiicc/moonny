import React, { useState, useEffect, useRef } from 'react'
import useSound from 'use-sound'
import ReactTooltip from 'react-tooltip'

import shot from '../assets/audio/shot.mp3'
import EnemyCard from './EnemyCard'
import { get_task, get_answer, battle_result } from './_api/Requests'
import { useSelector, useDispatch } from 'react-redux'

export default function BattlePage(props) {
  const dispatch = useDispatch()
  const character = useSelector((state) => state.character)

  const [answer, setAnswer] = useState('')
  const [taskVal, setTask] = useState(null)
  const [answerLen, setAnswerLen] = useState(1)

  const task = useRef(null)

  const [playShot] = useSound(shot)

  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

  const changeAnswer = (event) => {
    setAnswer(answer + event.target.innerText)
  }

  useEffect(() => {
    if (answer.length >= answerLen) {
      window.onkeyup = null

      get_answer(answer, character.nickname).then((res) => {
        if (res.char_hit) {
          playShot()
        }
        dispatch({ type: 'SET_FIGHT', payload: res })
        dispatch({ type: 'HIDE_DMG', payload: false })
        props.getCharacterInfo()
        props.getBotInfo()
        if (res.is_end) {
          props.onDrop(true)
          battle_result(character.nickname)
        }
        setAnswer('')
        props.setIsAttack(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer])

  const onStartFight = () => {
    get_task(props.botLvl, props.botDiff, character.nickname).then((data) => {
      setTask(data[0])
      setAnswerLen(data[1])

      props.setIsAttack(true)
      window.onkeyup = writeAnswer
      task.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      dispatch({ type: 'HIDE_DMG', payload: true })
    })
  }

  const writeAnswer = (e) => {
    if (e.key.match(/[0-9]/)) {
      setAnswer((a) => a + e.key)
    }
  }

  return (
    <>
      <ReactTooltip
        multiline={true}
        aria-haspopup="true"
        delayShow={200}
        className="tooltip"
        id="battleField"
      />
      <div className="task-field" ref={task}>
        {props.isAttack ? (
          <div className="task">
            <p>{taskVal}</p>
            <p className="ask-answer">x = ?</p>
            <p className="answer">{answer}</p>
            <div className="timelane">
              <div
                style={{
                  animation: `timelane ${character.time}s linear`,
                }}
              ></div>
            </div>
            <div className="keyboard">
              {digits.map((digit) => (
                <span key={digit} onClick={changeAnswer}>
                  {digit}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div>Are you ready</div>
            <div>for questions?</div>
            <button onClick={onStartFight} className="start-fight">
              Start Fight
            </button>
          </div>
        )}
      </div>
      <EnemyCard isBattle={props.isBattle} />
    </>
  )
}
