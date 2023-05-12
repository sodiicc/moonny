import React from 'react'
import ReactTooltip from 'react-tooltip'

export default function Bot({ diff, exp, img, onClick, numberDifficulty }) {
  return (
    <div className={'bot' + ' ' + diff.toLowerCase()}>
      <ReactTooltip
        multiline={true}
        aria-haspopup='true'
        delayShow={200}
        className='tooltip'
        id='exp'
      />
      <p>{diff}</p>
      <div
        // onMouseEnter={() => onGetExp(0)}
        data-tip={'exp: ' + exp}
        data-for='exp'
        className='bot-img'
      >
        <img src={img} alt='Bot' />
      </div>
      <span onClick={() => onClick(numberDifficulty)}>
        <button className='attack'>attack</button>
      </span>
    </div>
  )
}
