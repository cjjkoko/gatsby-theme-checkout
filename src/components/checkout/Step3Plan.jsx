import React, { useContext } from "react";
import styled from "styled-components";
import { FormContext } from "@/context/FormContext";

import Plan15gb from "@/images/planes/plan15.svg";
import Plan25gb from "@/images/planes/plan25.svg";
import Plan35gb from "@/images/planes/plan35.svg";

const PlanRequested = styled.div`
  margin-right: 60px;
  h2 {
    color: #7c6c8a;
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    margin-bottom: 10px;
    @media (max-width: 480px) {
      text-align: center;
    }
  }
  img {
    border-radius: 5px;
    box-shadow: 0px 0px 14px rgba(56, 20, 81, 0.25);
  }
  .planImage {
  }
  @media (max-width: 480px) {
    margin-right: 0;
  }
`;

const Step3Plan = (props) => {
  const   formData   = props;
  return (
    <PlanRequested>
      <h2>Plan Solicitado</h2>
      <div className="planImage">
        {formData.selectedPlan === "15gb" && (
          <img src={Plan15gb} alt="plan 15 gb" />
        )}
        {formData.selectedPlan === "25gb" && (
          <img src={Plan25gb} alt="plan 25 gb" />
        )}
        {formData.selectedPlan === "35gb" && (
          <img src={Plan35gb} alt="plan 35 gb" />
        )}
      </div>
    </PlanRequested>
  );
};

export default Step3Plan;
