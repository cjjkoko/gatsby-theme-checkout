import React, { createContext, useState } from "react";

export const FormContext = createContext();
/* isProcesed es el campo que indica si se mando a televentas*/
const FormContextProvider = (props) => {
  const [formData, setFormData] = useState({
    selectedPlan: "15gb",
    planType: "",
    rut: "",
    ci: "",
    name: "",
    lastName: "",
    phone: "",
    email: "",
    phoneToMigrate: "",
    originPlanType: "",
    previousCarrier: "",
    dispatchRegion: "",
    dispatchComuna: "",
    dispatchAddress: "",
    dispatchAddressNum: "",
    contractRegion: "",
    contractComuna: "",
    contractAddress: "",
    contractAddressNum: "",
    dispatchType: "",
    successFlow: false,
    isProcesed: false,
    storeInfo: {},
    beSameWithDispatch: false
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {props.children}
    </FormContext.Provider>
  );
};
export default FormContextProvider;
