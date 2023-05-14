import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { up_stats } from './_api/Requests'

import Images from './Images'

export default function CharCard(props) {
  const hit = useSelector((state) => state.fight_info.enemy_hit)
  const is_crit = useSelector((state) => state.fight_info.is_enemy_crit)
  const items = useSelector((state) => state.character.items)
  const current_hp = useSelector((state) => state.character.current_hp)
  const hp = useSelector((state) => state.character.hp)
  const current_exp = useSelector((state) => state.character.current_exp)
  const exp = useSelector((state) => state.character.exp)
  const str = useSelector((state) => state.character.str)
  const vit = useSelector((state) => state.character.vit)
  const acc = useSelector((state) => state.character.acc)
  const dex = useSelector((state) => state.character.dex)
  const dmg = useSelector((state) => state.character.dmg)
  const freeStats = useSelector((state) => state.character.free_stats)
  const nickname = useSelector((state) => state.character.nickname)
  const hideDmg = useSelector(state => state.gameplay.hideDmg)

  const [showHit, setShowHit] = useState(null)

  const weapon = items.filter(
    (item) => item.type === 'weapon' && item.is_weared
  )[0]
  const armor = items.filter(
    (item) => item.type === 'armor' && item.is_weared
  )[0]
  const helm = items.filter((item) => item.type === 'helm' && item.is_weared)[0]
  const boots = items.filter(
    (item) => item.type === 'boots' && item.is_weared
  )[0]
  const gloves = items.filter(
    (item) => item.type === 'gloves' && item.is_weared
  )[0]

  const returnItem = (item, description) => {
    return (
      <div
        data-tip={props.itemsDescription(item, description)}
        className={description + ' char-item'}
      >
        <img
          src={item ? Images[item.url] : Images['default_' + description]}
          alt={description}
        />
      </div>
    )
  }

  useEffect(() => {
    if (hideDmg) setShowHit(null)
    else {
      is_crit
        ? setShowHit(<div className="crit-taken">{hit ? hit : 'miss'}</div>)
        : setShowHit(<div className="dmg-taken">{hit ? hit : 'miss'}</div>)
    }
    return () => setShowHit(null)
  }, [hit, is_crit, hideDmg])

  const updateStats = (stat) => {
    up_stats(nickname, stat).then((res) => {
      if (res[0] === 200) props.getCharacterInfo()
    })
  }
  return (
    <StyledField>
      <div className="character">
        {showHit}
        <div className="char-middle">
          <div className="char-left">
            {returnItem(helm, 'helm')}
            {returnItem(boots, 'boots')}
            <div data-tip="Your Exp"  className="exp">
              <div
                style={{
                  height: `${(current_exp / exp) * 150}px`,
                }}
              ></div>
              <span>{current_exp}</span>
            </div>
          </div>

          <div
            data-tip="Its you - a handsome UFO )))"
            
            className="icon char"
          >
            <img src={Images.char} alt="img" />
          </div>

          <div className="char-right">
            {returnItem(armor, 'armor')}
            {returnItem(gloves, 'gloves')}
            <div data-tip="Char HP"  className="hp">
              <div
                style={{
                  height: `${
                    (current_hp / hp) * 150 > 0 ? (current_hp / hp) * 150 : 0
                  }px`,
                }}
              ></div>
              <span>{current_hp}</span>
            </div>
          </div>
        </div>

        {freeStats ? (
          <span className="free-stats">{freeStats} points</span>
        ) : null}

        <div className="char-bottom">
          {returnItem(weapon, 'weapon')}

          <div className="stats">
            <div
              data-tip="Strength affects the chance of crit and damage to you"
              
            >
              strength: {str}
              {freeStats ? (
                <button
                  onClick={() => updateStats('str')}
                  className="add_stats"
                >
                  +
                </button>
              ) : null}
            </div>
            <div
              data-tip="Vitality affects the power of crit and your HP"
              
            >
              vitality: {vit}
              {freeStats ? (
                <button
                  onClick={() => updateStats('vit')}
                  className="add_stats"
                >
                  +
                </button>
              ) : null}
            </div>
            <div
              data-tip="Dextirity affects the power of crit and the chance to dodge a blow"
              
            >
              dextirity: {dex}
              {freeStats ? (
                <button
                  onClick={() => updateStats('dex')}
                  className="add_stats"
                >
                  +
                </button>
              ) : null}
            </div>
            <div
              data-tip="Accuracy affects the chance of crit and the chance to hit the enemy"
              
            >
              accuracy: {acc}
              {freeStats ? (
                <button
                  onClick={() => updateStats('acc')}
                  className="add_stats"
                >
                  +
                </button>
              ) : null}
            </div>
            <div data-tip="Your Dmg" >
              weapon dmg: {dmg}
            </div>
          </div>
        </div>

        <div
          data-tip="Your inventory"
          
          className="bag"
          onClick={() => props.onBagClick(true)}
        ></div>
      </div>
    </StyledField>
  )
}

const StyledField = styled.div`
  .dmg-taken {
    position: absolute;
    right: 75px;
    top: 220px;
    color: var(--secondary);
    font-size: 34px;
    animation: hide 5s forwards;
  }

  .crit-taken {
    position: absolute;
    right: 70px;
    top: 220px;
    color: red;
    font-size: 34px;
    animation: hideCrit 5s forwards;
  }

  .char img {
    width: 200px;
    height: 298px;
    object-fit: cover;
  }

  .add_stats {
    cursor: pointer;
    display: inline-block;
    width: 15px;
    font-weight: 700;
    transform: translate(4px, -2px);
    background-color: inherit;
    color: var(--secondary);

    &:hover {
      transform: translate(4px, -2px) scale(1.5);
    }
  }

  .hp span,
  .exp span {
    position: relative;
  }

  .free-stats {
    position: absolute;
    bottom: 100px;
    right: 60px;
    color: var(--success);
    font-weight: bold;
  }
`
