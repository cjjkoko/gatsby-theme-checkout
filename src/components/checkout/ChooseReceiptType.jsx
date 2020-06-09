import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CheckboxOn from "@/images/checkbox-on.svg";
import Step2Address from "./Step2Address";
import PlanType from "./PlanType";
import StoreListItem from "./StoreListItem";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import TitleBlock from "./TitleBlock";
import ReactGA from "react-ga";
import Vector from "@/images/Vector.svg";
import Alerta from "@/images/icon_alerta.svg";
import RadiusContentWrapper from "./RadiusContentWrapper";

const PlanTypeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 30px;
  margin-top: 30px;
  @media (max-width: 480px) {
    flex-direction: column;
  }
  .planTypeWrapper {
    width: 48%;
    max-width: 280px;
    @media (max-width: 480px) {
      width: 100%;
      max-width: 100%;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const PlanTypeOneContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlanTypeOneStaticMessage = styled.div`
  display: flex;
  margin-top: 7px;
  width: 100%;
  .messageIcon {
    height: 16px;
    margin-right: 9px;
  }
  .message {
    font-size: 12px;
    line-height: 16px;
    color: #574466;
  }
`;

const TipWrapper = styled.div`
  display: flex;
  width: 88%;
  background: rgba(233, 172, 32, 0.1);
  border: 1px solid #e9ac20;
  box-sizing: border-box;
  border-radius: 4px;
  @media (max-width: 480px) {
    width: 100%;
  }
  .alerta {
    height: 15px;
    margin: 19px 21px 0 18px;
  }
  .title {
    margin: 13px 0 8px;
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    color: #7c6c8a;
  }
  .tips,
  .router {
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    color: #7c6c8a;
  }
  .router {
    margin-bottom: 21px;
    color: #e92070;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StoresTitle = styled.div`
  display: flex;
  margin-top: 35px;
  padding-bottom: 6px;
  width: 100%;
  max-width: 550px;
  border-bottom: 1px solid #e6e2e8;
  .number {
    margin-left: 20px;
    margin-right: 9px;
    color: #574466;
  }
  .text {
    color: #7c6c8a;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
`;
const BajadaText = styled.p`
  color: #7c6c8a;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  @media (max-width: 480px) {
    text-align: left;
  }
`;
const ConditionCheck = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding-top: 20px;
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
    font-size: 16px;
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
      height: 24px;
      width: 24px;
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
      transition: background-color 0.3s, background-image 0.5s,
        border-color 0.3s;
      @media (max-width: 480px) {
        height: 25px;
        width: 25px;
      }
    }
  }
`;

const Step2 = (props) => {
  const { regioneComunasList ,setValidationData,setFormData} = props;
  const   validationData  = props;
  const   formData  = props;
  const [disabledFields, setDisabledFields] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const [hasStore, setHasStore] = useState(true);

  const { dispatchRegion, dispatchComuna } = formData;
  useEffect(() => {
    setFormData({ ...formData, successFlow: false });
    console.log(dispatchRegion, dispatchComuna, regioneComunasList.regiones);
    if (
      dispatchRegion !== "" &&
      dispatchComuna !== "" &&
      regioneComunasList.regiones
    ) {
      const region =
        regioneComunasList.regiones &&
        regioneComunasList.regiones.filter((regioneItem) => {
          return regioneItem.REGION === dispatchRegion;
        })[0];
      if (region && region.COMUNAS) {
        const comuna = region.COMUNAS.filter(
          (comunaItem) => comunaItem.COMUNA === dispatchComuna
        )[0];
        if (comuna && comuna.ELOCKERS && comuna.ELOCKERS.length !== 0) {
          const availableStore = comuna.ELOCKERS.filter(
            // (store) => store.ESTADO === "ABIERTA"
            (store) => true
          );
          if (availableStore.length !== 0) {
            setStoreList(availableStore);
            setHasStore(true);
          } else {
            disableStorePickup();
          }
        } else {
          disableStorePickup();
        }
      } else {
        disableStorePickup();
      }
    }
    if (!regioneComunasList.regiones) {
      window.scrollTo(0, 0);
      ReactGA.pageview(
        window.location.pathname + `/?plan=${formData.selectedPlan}`
      );
    }
  }, [dispatchRegion, dispatchComuna, regioneComunasList]);

  const disableStorePickup = () => {
    setHasStore(false);
    setStoreList([]);
    setFormData({ ...formData, dispatchType: "Despacho a domicilio" });
  };

  const populateContract = (e) => {
    setDisabledFields(!disabledFields);
    if (!e.target.checked) {
      setFormData({
        ...formData,
        beSameWithDispatch: false,
      });
      return false;
    }
    const region = formData.dispatchRegion;
    const comuna = formData.dispatchComuna;
    const direccion = formData.dispatchAddress;
    const direccion2 = formData.dispatchAddressNum;
    let formValidityState = {
      contractRegion: false,
      contractComuna: false,
      contractAddress: false,
      contractAddressNum: false,
    };

    setFormData({
      ...formData,
      beSameWithDispatch: true,
      contractRegion: region,
      contractComuna: comuna,
      contractAddress: direccion,
      contractAddressNum: direccion2,
    });
    validationData.dispatchRegion
      ? (formValidityState = { ...formValidityState, contractRegion: true })
      : (formValidityState = { ...formValidityState, contractRegion: false });
    validationData.dispatchComuna
      ? (formValidityState = { ...formValidityState, contractComuna: true })
      : (formValidityState = { ...formValidityState, contractComuna: false });
    validationData.dispatchAddress
      ? (formValidityState = {
          ...formValidityState,
          contractAddress: true,
          contractAddressNum: true,
        })
      : (formValidityState = {
          ...formValidityState,
          contractAddress: false,
          contractAddressNum: false,
        });
    setValidationData({ ...validationData, ...formValidityState });
  };

  const onChoose = (store) => {
    const { setStore } = props;
    setFormData({
      ...formData,
      storeInfo: store,
    });

    setStore && setStore(store);
  };

  const ButtonWrapper = () => {
    return (
      <ButtonContainer>
        <PrevButton
          stepNum="Volver"
          stepTitle="Tus Datos"
          route={`/app/?plan=${formData.selectedPlan}`}
        />

        {formData.dispatchType !== "" && (
          <NextButton
            stepNum="3"
            stepTitle="Resumen Final"
            route="/app/paso3"
            status={
              formData.dispatchType === "Despacho a domicilio" &&
              validationData.dispatchRegion &&
              validationData.dispatchComuna &&
              validationData.dispatchAddress &&
              validationData.contractRegion &&
              validationData.contractComuna &&
              validationData.contractAddress
                ? "active"
                : "innactive"
            }
          />
        )}
      </ButtonContainer>
    );
  };

  return (
    <>
      <RadiusContentWrapper>
        <TitleBlock
          classAdd="text-center mb-20"
          titulo="Elige tus opciones de despacho"
        />
        <BajadaText>
          Selecciona región y comuna donde quieres despachar o retirar tus
          productos.
        </BajadaText>
        <Step2Address
          {...props}
          showparty={1}
          regionName="dispatchRegion"
          comunaName="dispatchComuna"
        />
        {!hasStore && (
          <TipWrapper>
            <img className="alerta" src={Alerta} alt="vector" />
            <div>
              <div className="title">Retiro en tienda no disponible</div>
              <div className="tips">
                Lamentablemente no tenemos disponibilidad en la comuna
                seleccionada
              </div>
              <a className="router" />
            </div>
          </TipWrapper>
        )}
        {dispatchRegion !== "" && dispatchComuna !== "" && (
          <PlanTypeContainer>
            <div className="planTypeWrapper">
              <PlanType
                title="Retiro en tienda"
                subtitle={hasStore ? "Desde 5 días hábiles" : "NO DISPONIBLE"}
                status={hasStore ? "GRATIS" : null}
                type="Retiro en tienda"
                disabled={
                  !hasStore || dispatchRegion === "" || dispatchComuna === ""
                }
                selected={
                  formData.dispatchType === "Retiro en tienda" && hasStore
                    ? true
                    : false
                }
                dataName="dispatchType"
              />
              {formData.dispatchType === "Retiro en tienda" && (
                <PlanTypeOneStaticMessage>
                  <img className="messageIcon" src={Vector} alt="vector" />
                  <div className="message">
                    Retira tu equipo en nuestros E-Locker a través de un código
                    QR
                  </div>
                </PlanTypeOneStaticMessage>
              )}
            </div>

            <div className="planTypeWrapper">
              <PlanType
                title="Despacho a domicilio"
                subtitle={"Desde 5 días hábiles"}
                status={"GRATIS"}
                type="Despacho a domicilio"
                selected={
                  formData.dispatchType === "Despacho a domicilio" || !hasStore
                    ? true
                    : false
                }
                dataName="dispatchType"
              />
              {formData.dispatchType === "Despacho a domicilio" && (
                <PlanTypeOneStaticMessage>
                  <img className="messageIcon" src={Vector} alt="vector" />
                  <div className="message">
                    Solo el titular puede recibir el Chip
                  </div>
                </PlanTypeOneStaticMessage>
              )}
            </div>
          </PlanTypeContainer>
        )}

        {formData.dispatchType === "Retiro en tienda" && (
          <PlanTypeOneContentWrapper>
            <StoresTitle>
              <div className="number">{storeList ? storeList.length : 0}</div>
              <div className="text">tiendas encontradas</div>
            </StoresTitle>
            {storeList &&
              storeList.map((item, index) => {
                return (
                  <StoreListItem onChoose={onChoose} data={item} key={index} />
                );
              })}
          </PlanTypeOneContentWrapper>
        )}

        {formData.dispatchType === "Despacho a domicilio" ? (
          <>
            <BajadaText>
              Ingresa la dirección donde despacharemos tu producto.
            </BajadaText>
            <Step2Address
              {...props}
              showparty={2}
              addressName="dispatchAddress"
              addressNumName="dispatchAddressNum"

            />
          </>
        ) : (
          <ButtonWrapper />
        )}
      </RadiusContentWrapper>

      {formData.dispatchType === "Despacho a domicilio" && (
        <RadiusContentWrapper>
          <TitleBlock
            classAdd="text-center"
            titulo="Dirección para tu contrato"
          />
          <ConditionCheck>
            <input
              type="checkbox"
              id="precio-2"
              value="2"
              checked={formData["beSameWithDispatch"]}
              onChange={populateContract}
            />
            <label htmlFor="precio-2">
              Usar la misma dirección de despacho.
            </label>
          </ConditionCheck>
          <Step2Address
            {...props}
            regionName="contractRegion"
            comunaName="contractComuna"
            addressName="contractAddress"
            addressNumName="contractAddressNum"
            disabledFields={disabledFields}
          />
          <ButtonWrapper />
        </RadiusContentWrapper>
      )}
    </>
  );
};
export default Step2;
