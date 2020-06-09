import React, { Fragment, useEffect, useContext } from "react";
import { FormContext } from "@/context/FormContext";
import Step3Plan from "./Step3Plan";
import Step3Info from "./Step3Info";
import styled from "styled-components";
import Step3Conditions from "./Step3Conditions";
import TitleBlock from "./TitleBlock";
import ReactGA from "react-ga";
import RadiusContentWrapper from "./RadiusContentWrapper";
import { connect } from "react-redux"
import ChooseReceiptType from "./ChooseReceiptType"

const WrapperStep3 = styled.div`
  width: 100%;
  max-width: 660px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Step3 = (props) => {
  const formData = props
  const setFormData = (payload) => {
    return props.dispatch({
      type: 'FormContent/setFormData',
      payload
    })
  }
  const setValidationData = (payload) => {
    return props.dispatch({
      type: "ValidationContent/setValidationData",
      payload
    })
  }
  useEffect(() => {
    setFormData({ ...formData, successFlow: false });
    window.scrollTo(0, 0);
    ReactGA.pageview(
      window.location.pathname + `/?plan=${formData.selectedPlan}`
    );
  }, []);
  return (
    <RadiusContentWrapper>
      <TitleBlock titulo="Resumen de tu solicitud" />
      <WrapperStep3>
        <Step3Plan  {...props} setFormData={setFormData} setValidationData={setValidationData}/>
        <Step3Info {...props} setFormData={setFormData} setValidationData={setValidationData} />
      </WrapperStep3>
      <Step3Conditions {...props} setFormData={setFormData} setValidationData={setValidationData} />
    </RadiusContentWrapper>
  );
};
export default connect(
  ({ FormContent, ValidationContent }) => ({ ...FormContent, ...ValidationContent })
)(Step3)

