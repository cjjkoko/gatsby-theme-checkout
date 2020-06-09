/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from "react"

import "./layout.css"
import styled from "styled-components"
import HeaderScene from "@/components/checkout/HeaderScene"
import Header from "@/components/checkout/Header"
import FooterScene from "@/components/checkout/FooterScene"
import Footer from "@/components/checkout/Footer"

const Layout = ({ children }) => {
  const Wrapper = styled.div`  
    width: 100%; 
    background-color: #f1f3f5;
  `
  return (
    <Wrapper>
      <HeaderScene/>
      <Header/>
      {children}
      <FooterScene/>
      <Footer/>
    </Wrapper>
  )
}


export default Layout
