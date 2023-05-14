import React, { useState } from 'react'
import styled from 'styled-components'
import Images from './Images'
import ReactTooltip from 'react-tooltip'
import ApproveModal from './ApproveModal'

export default function Inventory(props) {
  const [question, setQuestion] = useState('')
  const [isDelete, setIsDelete] = useState(false)

  const items = props.charData.items
  console.log('props.charData', props.charData)

  const onDel = (item) => {
    setQuestion(`Do you really want to delete ${item}?`)
    setIsDelete(true)
  }

  const modalHandler = (res) => {
    setQuestion('')
    setIsDelete(false)
  }

  return (
    <StyledField>
      <ReactTooltip
        multiline={true}
        aria-haspopup="true"
        delayShow={200}
        className="tooltip"
        id="inventory"
      />
      {isDelete ? (
        <ApproveModal modalHandler={modalHandler} question={question} />
      ) : null}
      <div className="bag-window">
        <div className="bag-name">
          Choose items
          <span className="close-btn" onClick={() => props.onBagClose(false)}>
            X
          </span>
        </div>
        {items.map((item, i) => (
          <div
            data-tip={props.itemsDescription(item, item.type)}
            data-for="inventory"
            
            key={item.name + i}
            className={`${item.rar} ${
              item.is_weared ? 'weared bag-item' : 'not_weared bag-item'
            }`}
            onClick={() => props.onWearItem(item.id, item.is_weared, item.type, props.charData.nickname)}
          >
            <img src={Images[item.url]} alt={item.name} />
            <span onClick={() => onDel(item.name)}>x</span>
          </div>
        ))}
      </div>
    </StyledField>
  )
}

const StyledField = styled.div`
  .bag-window {
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
    width: 310px;
    height: 350px;
    z-index: 100;
    overflow-y: auto;
    font-weight: normal;
    color: var(--main);
  }

  .bag-item {
    position: relative;
    text-align: center;
    margin: 2px;
    cursor: pointer;
  }

  .not_weared {
    opacity: 0.5;
  }

  .bag-item > img {
    width: 40px;
    height: 40px;
  }

  .bag-item > span {
    position: absolute;
    display: inline-block;
    width: 12px;
    height: 12px;
    color: white;
    top: 0;
    right: 0;
    font-size: 16px;
    font-weight: 400;
    background-color: red;
    border-radius: 50%;
    line-height: 10px;
  }

  .bag-name {
    width: 100%;
    height: 20px;
    text-align: center;
    position: relative;
  }

  .close-btn {
    color: white;
    width: 18px;
    height: 18px;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;
    border-radius: 50%;
    background-color: red;
    line-height: 16px;
  }

  .common {
    border: 2px solid var(--common);
  }

  .uncommon {
    border: 2px solid var(--uncommon);
  }

  .magic {
    border: 2px solid var(--magic);
  }

  .rare {
    border: 2px solid var(--rare);
  }

  .epic {
    border: 2px solid var(--epic);
  }

  .legendary {
    border: 2px solid var(--legendary);
  }
`
