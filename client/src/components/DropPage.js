import React from 'react'
import styled from 'styled-components'
import Images from './Images'
import ReactTooltip from 'react-tooltip'
import { useSelector, useDispatch } from 'react-redux'

export default function DropPage(props) {
  const dispatch = useDispatch()
  const exp = useSelector((state) => state.fight_info.exp)
  const result = useSelector((state) => state.fight_info.result_fight)
  const drop = useSelector((state) => state.fight_info.drop)

  const onSubmit = () => {
    dispatch({ type: 'HIDE_DMG', payload: true })
    props.onDrop(false, true)
  }

  return (
    <StyledField>
      <ReactTooltip
        multiline={true}
        aria-haspopup="true"
        delayShow={200}
        className="tooltip"
        id="drop"
      />
      <div className="drop-modal">
        <div
          className={
            result === 'win' ? 'win' : result === 'lose' ? 'lose' : 'draw'
          }
        >
          {result}
        </div>
        {exp ? <div>Exp earned: {exp}</div> : null}
        <div className="drop">
          <div className="bag-name">Drop List</div>
          {drop.map((item, i) => (
            <div
              data-tip={props.itemsDescription(item, item.type)}
              
              data-for="drop"
              key={item.name + i}
              className="bag-item"
            >
              <img src={Images[item.url]} alt={item.name} />
            </div>
          ))}
          <div className="gold-earned">Gold earned: 13</div>
        </div>
        <button onClick={onSubmit}>Ok</button>
      </div>
    </StyledField>
  )
}

const StyledField = styled.div`
  position: absolute;
  background-color: #0006;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 50;

  .drop-modal {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 196px;
    z-index: 100;
    overflow-y: auto;
    font-weight: normal;
    color: var(--main);
    top: 100px;
    justify-content: center;
  }

  .drop {
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    justify-content: center;
    padding: 0 5px;
  }

  .bag-item {
    position: relative;
    text-align: center;
    margin: 2px;
    cursor: pointer;
  }

  .bag-item > img {
    width: 40px;
    height: 40px;
  }

  .bag-name {
    width: 100%;
    height: 20px;
    text-align: center;
    position: relative;
  }

  .drop-modal button {
    margin-top: 15px;
    margin-bottom: 10px;
    color: var(--main);
    width: 60px;
    padding: 3px 6px;
    background-color: #555;
    border-radius: 3px;
    cursor: pointer;
  }

  .win,
  .lose,
  .draw {
    text-align: center;
    font-size: 32px;
    margin: 5px auto;
    width: 100%;
  }
  .win {
    color: var(--success);
  }
  .lose {
    color: var(--warning);
  }
  .gold-earned {
    color: var(--success);
    width: 100%;
    text-align: center;
  }
`
