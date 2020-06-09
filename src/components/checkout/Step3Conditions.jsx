import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";
import CheckboxOn from "@/images/checkbox-on.svg";
import document from "@/assets/Terminos_y_Condiciones-Venta_de_planes.pdf";
import ReactGA from "react-ga";
import axios from "axios";
const Conditions = styled.div`
  width: 100%;
  max-width: 768px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
  .condition-check {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media (max-width: 640px) {
      margin-bottom: 20px;
    }
    input {
      display: none;
      &:checked + label {
        &:after {
          background-color: #e92070;
          background-image: url(${CheckboxOn});
          border-color: #e92070;
          transition: background-color 0.5s, background-image 0.5s,
            border-color 0.5s;
        }
      }
    }
    label {
      padding-left: 40px;
      position: relative;
      color: #7c6c8a;
      text-decoration-line: underline;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
      a {
        color: #7c6c8a;
        text-decoration-line: underline;
        text-transform: uppercase;
      }
      @media (max-width: 480px) {
        font-size: 12px;
      }
      &:after {
        content: "";
        height: 30px;
        width: 30px;
        border: 1px solid#FF006F;
        border-radius: 2px;
        background-color: transparent;
        background-position: center center;
        background-repeat: no-repeat;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: auto;
        margin: auto;
        transition: background-color 0.5s, background-image 0.5s,
          border-color 0.5s;
        @media (max-width: 480px) {
          height: 25px;
          width: 25px;
        }
      }
    }
  }
  .btn-request {
    width: 100%;
    max-width: 300px;
    background-color: #e92070;
    border-radius: 8px;
    text-decoration: none;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;
    padding: 14px 20px;
    border: none;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    transition: background-color 0.3s;
    &:hover {
      background-color: #8e1344;
    }
    &.disabled {
      background-color: #b3a6ba;
      pointer-events: none;
    }
  }
`;

const Step3Conditions = (props) => {
  const [checked, setChecked] = useState(false);
  const [sending, setSending] = useState(false);
  const   formData  = props
  const handleClick = () => {
    setSending(true);
    ReactGA.set(formData);
    navigate("/app/paso4");
    props.dispatch({
      type:"Magento/setPaymentMethodAndPlaceOrder"
    })
  };

  return (
    <Conditions>
      <div className="condition-check">
        <input
          type="checkbox"
          id="precio-2"
          value="2"
          onClick={() => setChecked(!checked)}
        />
        <label htmlFor="precio-2">
          <a href={document} target="_blank" rel="noopener noreferrer">
            aceptar términos y condiciones
          </a>
        </label>
      </div>
      <button
        className={checked ? "btn-request" : "btn-request disabled"}
        onClick={handleClick}
      >
        {sending ? "Enviando..." : "Ingresar solicitud"}
      </button>
    </Conditions>
  );
};

export default Step3Conditions;
