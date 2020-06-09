import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import PickupStore from "./PickupStore"
import ChooseReceiptType from "./ChooseReceiptType"
import { connect } from "react-redux"

const Step2 = (props) => {
  const formData = props
  const [regioneComunasList, setRegioneComunasList] = useState({})


  useEffect(() => {
    axios
      .get(
        "https://1701336841.rsc.cdn77.org/json/regiones-comunas-elockers-matrix.json"
      )
      .then((res) => {
        setRegioneComunasList(res.data)
      })
  }, regioneComunasList)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [formData.storeInfo])

  const setValidationData = (payload) => {
    return props.dispatch({
      type: "ValidationContent/setValidationData",
      payload
    })
  }
  const setFormData = (payload) => {
    return props.dispatch({
      type: "FormContent/setFormData",
      payload
    })
  }
  return (
    <>
      {Object.keys(formData.storeInfo).length === 0 ? (
        <ChooseReceiptType {...props} setValidationData={setValidationData} setFormData={setFormData}
                           regioneComunasList={regioneComunasList}/>
      ) : (
        <PickupStore  {...props} setValidationData={setValidationData} setFormData={setFormData}
                      store={formData.storeInfo}/>
      )}
    </>
  )
}
export default connect(
  ({ FormContent, ValidationContent }) => ({ ...FormContent, ...ValidationContent })
)(Step2)
