import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import { connect } from "react-redux"

const ButtonWrap = styled.div`
  max-width: 230px;
  width: 100%;
  background: #ccc4d2;
  border-radius: 8px;
  padding: 8px 15px;
  position: relative;
  height: 45px;
  pointer-events: none;
  transition: background 0.5s ease;
  user-select: none;
  text-decoration: none;
  &.active {
    background: #e92070;
    pointer-events: unset;
    cursor: pointer;
  }
  .text-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    div {
      font-family: "cerapro";
      font-size: 14px;
      line-height: 14px;
      color: white;
      font-weight: 300;
      span {
        font-weight: 700;
      }
    }
  }
  .arrow {
    position: absolute;
    right: 10px;
    top: 23px;
  }
`

const onClickToRouter = (route, dispatch) => {
  console.log(route, dispatch)
  if (route === "/app/paso2") {
    dispatch({
      type: "Magento/createEmptyCart"
    }).then(res => {
      console.log(res)
    })
  }
  if (route === "/app/paso3") {
    dispatch({
      type: "Magento/setShippingAddressOnCart"
    }).then(res => {
      console.log(res)
    })
  }
  navigate(route)
}

const NextButton = ({ stepNum, stepTitle, status, route, dispatch }) => {
  return (
    <ButtonWrap
      className={status === "active" && "active"}
      to={route}
      onClick={onClickToRouter.bind(this, route, dispatch)}
    >
      <div

        className="text-box">
        <div>
          Paso <span>{stepNum}</span>
        </div>
        <div>
          <span>{stepTitle}</span>
        </div>
      </div>
      <div className="arrow">
        <svg
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.609113 0.927797C0.400503 0.716503 0.400503 0.369765 0.609113 0.158471C0.817722 -0.0528235 1.15638 -0.0528235 1.36446 0.158471L7.72413 6.08554C7.83507 6.19931 7.88284 6.35101 7.87488 6.49729C7.88284 6.64899 7.83507 6.80069 7.72413 6.91446L1.36446 12.8415C1.15638 13.0528 0.817722 13.0528 0.609113 12.8415C0.400503 12.6248 0.400503 12.2835 0.609113 12.0722L6.58448 6.49729L0.609113 0.927797Z"
            fill="white"
          />
        </svg>
      </div>
    </ButtonWrap>
  )
}
export default connect()(NextButton)
