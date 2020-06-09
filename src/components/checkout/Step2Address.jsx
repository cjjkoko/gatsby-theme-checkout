import React, { useState, useEffect } from "react"
import axios from "axios"
import InputItem from "./InputItem"
import InputSelectRegiones from "./InputSelectRegiones"
import InputSelectComunas from "./InputSelectComunas"
import styled from "styled-components"
import IconUbic from "@/images/icon_ubicacion.svg"

const FormAdress = styled.div`
  width: 100%;
  max-width: 400px;
  margin-top: 30px;
  .select-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #7c6c8a;
  }
`

const Step2Adress = (props) => {
  const {
    regionName,
    comunaName,
    addressName,
    addressNumName,
    disabledFields = false,
    showparty = 0
  } = props
  const [regionsList, setRegionsList] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios
      .get(
        "https://1701336841.rsc.cdn77.org/json/regiones-comunas-elockers-matrix.json"
      )
      .then((res) => {
        setRegionsList(res.data.regiones)
      })
      .then(() => {
        setLoaded(true)
      })
  }, [])

  return (
    <FormAdress>
      {(showparty === 0 || showparty === 1|| showparty === 2) && (
        <>
          <p className="select-title">Región</p>
          <InputSelectRegiones
            {...props}
            classAdd="full-width full-border"
            regionsList={regionsList}
            fieldName={regionName}
            comunaName={comunaName}
            disabledFields={disabledFields}
            loaded={loaded}
          />
          <p className="select-title">Comuna</p>
          <InputSelectComunas
            {...props}
            classAdd="full-width full-border"
            regionsList={regionsList}
            loaded={loaded}
            fieldName={comunaName}
            comunaName={comunaName}
            regionField={regionName}
            disabledFields={disabledFields}
          />
        </>
      )}
      {(showparty === 0 || showparty === 1||showparty === 2)&&!!addressName&&!!addressNumName && (
        <>
          <InputItem
            {...props}
            classAdd="full-width"
            nameInput={addressName}
            iconInput={IconUbic}
            nameLabel="Dirección"
            disabledFields={disabledFields}
            length="50"
          />
          <InputItem
            {...props}
            classAdd="full-width"
            nameInput={addressNumName}
            // iconInput={IconUbic}
            nameLabel="Depto / oficina / otro"
            disabledFields={disabledFields}
            length="50"
          />
        </>
      )}
    </FormAdress>
  )
}

export default Step2Adress
