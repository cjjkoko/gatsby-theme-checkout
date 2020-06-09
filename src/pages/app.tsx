import React from "react"
import { Router } from "@reach/router"
import Step3 from "@/components/checkout/Step3"
import Step4 from "@/components/checkout/Step4"
import "./app.scss"
import PrivateRoute from "@/components/auth/privateRoute"
import Step1 from "@/components/checkout/Step1"
import Step2 from "@/components/checkout/Step2"
import HeaderScene from "@/components/checkout/HeaderScene"
import Header from "@/components/checkout/Header"
import FooterScene from "@/components/checkout/FooterScene"
import Footer from "@/components/checkout/Footer"

const App = () => (
  <>
    <HeaderScene/>
    <Header/>
    <Router basepath='/app' style={{
      width: "100%",
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column"
    }}>
      <PrivateRoute path="/" component={Step1}/>
      <PrivateRoute path="/paso2" component={Step2}/>
      <PrivateRoute path="/paso3" component={Step3}/>
      <PrivateRoute path="/paso4" component={Step4}/>
    </Router>
    <FooterScene/>
    <Footer/>
  </>
)
// @ts-ignore
export default App
