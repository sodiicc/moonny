import React from 'react'
import styled from 'styled-components'

export default function ApproveModal(props) {
  return (
    <StyledField>
      <div className="modal-wrapper">
        <div className="modal">
          <div>{props.question}</div>
          <div>
            <button onClick={() => props.modalHandler(true)}>Yes</button>
            <button onClick={() => props.modalHandler(false)}>No</button>
          </div>
        </div>
      </div>
    </StyledField>
  )
}

const StyledField = styled.div`
  .modal-wrapper {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
    color: var(--main);
  }

  .modal {
    position: fixed;
    border-radius: 10px;
    padding: 20px;
    width: 160px;
    background-color: grey;
    left: 50%;
    transform: translateX(-50%);
    top: 150px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 20px;
  }

  .modal button {
    color: var(--main);
    width: 40px;
    padding: 3px 6px;
    background-color: #555;
    border-radius: 3px;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
`
