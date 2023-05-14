import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Images from './Images'
import { useSelector } from 'react-redux'

const difficultyDictionary = ['Easy', 'Normal', 'Strong', 'Very strong', 'Boss', 'Raid boss']

export default function EnemyCard() {
  const data = useSelector((state) => state.bot)
  const hp = useSelector((state) => state.bot.hp)
  const current_hp = useSelector((state) => state.bot.current_hp)
  const hit = useSelector((state) => state.fight_info.char_hit)
  const is_crit = useSelector((state) => state.fight_info.is_char_crit)
  const hideDmg = useSelector(state => state.gameplay.hideDmg)


  const [showHit, setShowHit] = useState(null)

  useEffect(() => {
    if (hideDmg) setShowHit(null)
    else {
      is_crit
        ? setShowHit(<div className="crit-taken">{hit ? hit : 'miss'}</div>)
        : setShowHit(<div className="dmg-taken">{hit ? hit : 'miss'}</div>)
    }
    return () => setShowHit(null)
  }, [hit, is_crit, hideDmg])

  const weapon = data.items.filter(
    (item) => item.type === 'weapon' && item.is_weared
  )[0]
  const armor = data.items.filter(
    (item) => item.type === 'armor' && item.is_weared
  )[0]
  const helm = data.items.filter(
    (item) => item.type === 'helm' && item.is_weared
  )[0]
  const boots = data.items.filter(
    (item) => item.type === 'boots' && item.is_weared
  )[0]
  const gloves = data.items.filter(
    (item) => item.type === 'gloves' && item.is_weared
  )[0]

  const [isCrit, setIsCrit] = useState(false)

  const itemsDescription = (item) => {
    return item
      ? `${item.name}<br />Set: ${item.set_name}<br />Rarity: ${
          item.rar
        }<br />Main Bonus: ${Object.keys(item.main_bonus).map(
          (key) => '<br/>' + key + ': ' + item.main_bonus[key]
        )}<br />bonus for 3 items: ${Object.keys(item.set_bonus[0]).map(
          (key) => '<br/>' + key + ': ' + item.set_bonus[0][key]
        )}<br />Bonus for 5 items: ${Object.keys(item.set_bonus[1]).map(
          (key) => '<br/>' + key + ': ' + item.set_bonus[1][key]
        )}`
      : 'Empty slot'
  }

  const returnItem = (item, description) => {
    return (
      <div
        data-tip={itemsDescription(item)}
        
        data-for="battleField"
        className={description + ' char-item'}
      >
        <img
          src={item ? Images[item.url] : Images['default_' + description]}
          alt={description}
        />
      </div>
    )
  }

  return (
    <StyledField>
      <div className="character">
        {showHit}
        <div className="char-middle">
          <div className="char-left">
            {returnItem(helm, 'helm')}
            {returnItem(boots, 'boots')}

            <div
              data-tip="Enemy HP"
              
              data-for="battleField"
              className="hp"
            >
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

          <div
            data-tip="Enemy FACE"
            
            data-for="battleField"
            className="icon enemy_char"
          >
            <span className='bot-level-field'>{data.lvl} lvl / {difficultyDictionary[data.diff]}</span>
            <img
              onClick={() => setIsCrit(!isCrit)}
              src={Images.enemy}
              alt="img"
            />
          </div>

          <div className="char-right">
            {returnItem(armor, 'armor')}
            {returnItem(gloves, 'gloves')}
            <div
              data-tip="Enemy Difficulty"
              
              data-for="battleField"
              className="exp"
            >
              easy
            </div>
          </div>
        </div>

        <div className="char-bottom">
          {returnItem(weapon, 'weapon')}

          <div className="stats">
            <div
              data-tip="Enemy Strength"
              
              data-for="battleField"
            >
              strength: {data.str}
            </div>
            <div
              data-tip="Enemy Vetality"
              
              data-for="battleField"
            >
              vitality: {data.vit}
            </div>
            <div
              data-tip="Enemy Dextirity"
              
              data-for="battleField"
            >
              dextirity: {data.dex}
            </div>
            <div
              data-tip="Enemy Accuracy"
              
              data-for="battleField"
            >
              accuracy: {data.acc}
            </div>
            <div
              data-tip="Enemy Damage"
              
              data-for="battleField"
            >
              weapon dmg: {data.dmg}
            </div>
          </div>
        </div>
      </div>
    </StyledField>
  )
}

const StyledField = styled.div`
  .dmg-taken {
    position: absolute;
    left: 75px;
    top: 220px;
    color: var(--secondary);
    font-size: 34px;
    animation: hide 5s forwards;
    z-index: 1;
  }

  .crit-taken {
    position: absolute;
    left: 70px;
    top: 220px;
    color: red;
    font-size: 34px;
    animation: hideCrit 5s forwards;
    z-index: 1;
  }

  .enemy_task_wrapper {
    display: flex;
    width: 750px;
  }

  .enemy_char {
    position: relative;
    
    img {
    width: 200px;
    height: 298px;
    object-fit: cover;
    transform: rotateY(180deg);
  }
  }

  .weapon > img {
    transform: rotateY(180deg);
  }

  .enemy-hp {
    display: block;
    background: red;
    width: 200px;
    height: 20px;
    position: absolute;
    top: 370px;
    left: 25px;
    z-index: 1;
    border-radius: 3px;
  }

  .hp span {
    position: relative;
  } 

  .bot-level-field {
    position: absolute;
    z-index: 1;
    top: 10px;
    left: 10px;
  }
`
