import React from "react"
import queryString from "query-string"
import styled from "styled-components"
import PlanType from "./PlanType"
import Step1Inputs from "./Step1Inputs"
import Step1InputsPortabilidad from "./Step1InputsPortabilidad"
import Step1PhoneMessage from "./Step1PhoneMessage"
import TitleBlock from "./TitleBlock"
import NextButton from "./NextButton"
import { motion, AnimatePresence } from "framer-motion"
import ReactGA from "react-ga"
import RequestPlan from "./RequestPlan"
import RequestPlanMob from "./RequestPlanMob"
import RadiusContentWrapper from "./RadiusContentWrapper"
import { connect } from "react-redux"
import { validate } from "rut.js"

const StepWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 18px;
    line-height: 23px;
    color: #7c6c8a;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .plan-types-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 30px;
    @media (max-width: 480px) {
      flex-direction: column;
    }
    .planTypeWrapper {
      width: 48%;
      max-width: 280px;
      @media (max-width: 480px) {
        width: 100%;
        max-width: 100%;
        margin-bottom: 12px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .bot-button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
    @media (max-width: 480px) {
      margin-top: 20px;
    }
  }
`

const BajadaText = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #7c6c8a;
`
const MotionDiv = styled(motion.div)`
  width: 100%;
`
const VoidContainer = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const duration = 0.3

const variants = {
  initial: {
    opacity: 0,
    height: 0
  },
  enter: {
    height: "auto",
    opacity: 1,
    transition: {
      duration,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { delay: 0.2 },
      duration
    }
  }
}
class Step1 extends React.Component {

  state = {
    showPc: true
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search)
    console.log(parsed)
    this.props.dispatch({
      type: "FormContent/setFormData",
      payload: {
        selectedPlan: parsed.plan,
        successFlow: false
      }
    })
    ReactGA.pageview(window.location.pathname + parsed.plan)
    this.setState({
      showPc: window.innerWidth >= 768
    })


  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {rutS,rut} = this.props
    if(validate(rut)){
      // this.props.dispatch({
      //   type:"Magento/getCart"
      // })
    }
  }

  render() {
    console.log("sssss",this.props.selectedPlan,this.props )
    if (
      (this.props.selectedPlan !== undefined && this.props.selectedPlan === "15gb") ||
      (this.props.selectedPlan !== undefined && this.props.selectedPlan === "25gb") ||
      (this.props.selectedPlan !== undefined && this.props.selectedPlan === "35gb")
    ) {
      return (
        <>
          {this.state.showPc ? <RequestPlan/> : <RequestPlanMob/>}
          <RadiusContentWrapper>
            <StepWrapper>
              <h1>Solicita tu plan WOM en línea</h1>
              <div className="plan-types-container">
                <div className="planTypeWrapper">
                  <PlanType
                    title="Quiero portarme"
                    subtitle="Cámbiate a WOM manteniendo tu número de teléfono actual."
                    type="portabilidad"
                    selected={this.props.planType === "portabilidad" ? true : false}
                    dataName="planType"
                  />
                </div>
                <div className="planTypeWrapper">
                  <PlanType
                    title="Línea nueva"
                    subtitle="Obtén un nuevo número con WOM."
                    type="lineaNueva"
                    selected={this.props.planType === "lineaNueva" ? true : false}
                    dataName="planType"
                  />
                </div>
              </div>
              <AnimatePresence>
                {this.props.planType !== "" && (
                  <MotionDiv
                    variants={variants}
                    key="23236"
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <TitleBlock classAdd="mb-20" titulo="Información Personal"/>
                    <BajadaText>
                      Ingresa tus datos y revisa que la información sea correcta.
                    </BajadaText>
                    <Step1Inputs/>
                  </MotionDiv>
                )}
                {this.props.planType === "portabilidad" && (
                  <MotionDiv
                    variants={variants}
                    key="135sdg"
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <TitleBlock titulo="Datos de la línea a portar."/>
                    <Step1InputsPortabilidad/>
                  </MotionDiv>
                )}
                {this.props.planType === "lineaNueva" ||
                this.props.planType === "portabilidad" ? null : (
                  <MotionDiv
                    variants={variants}
                    key="13513"
                    initial="initial"
                    animate="enter"
                    exit="exit"
                  >
                    <Step1PhoneMessage/>
                  </MotionDiv>
                )}
              </AnimatePresence>
              <div className="bot-button-container">
                {this.props.planType === "lineaNueva" ||
                this.props.planType === "portabilidad" ? (
                  <NextButton
                    stepNum="2"
                    stepTitle="Despacho"
                    route="/app/paso2"
                    status={
                      this.props.planType === "portabilidad"
                        ? this.props.ciS &&
                        this.props.rutS &&
                        this.props.nameS &&
                        this.props.lastNameS &&
                        this.props.phoneS &&
                        this.props.emailS &&
                        this.props.phoneToMigrateS &&
                        this.props.originPlanTypeS &&
                        this.props.previousCarrierS
                        ? "active"
                        : "innactive"
                        : this.props.ciS &&
                        this.props.rutS &&
                        this.props.nameS &&
                        this.props.lastNameS &&
                        this.props.phoneS &&
                        this.props.emailS
                        ? "active"
                        : "innactive"
                    }
                  />
                ) : null}
              </div>
            </StepWrapper>
          </RadiusContentWrapper>
        </>
      )
    } else {
      return (
        <>
          {this.state.showPc? <RequestPlan/> : <RequestPlanMob/>}
          <VoidContainer>
            <h1>No hay plan seleccionado</h1>
          </VoidContainer>
        </>
      )
    }
  }
}
export default connect(({ FormContent, ValidationContent }) => ({ ...FormContent, ...ValidationContent }))(Step1)


