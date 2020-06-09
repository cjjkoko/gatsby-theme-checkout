/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
// @ts-ignore
import React from "react"
// @ts-ignore
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

// @ts-ignore
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
      query {
          headerLayout: file(relativePath: { eq: "marketing/headerLayout.png" }) {
              childImageSharp {
                  fluid(
                      maxWidth:1920
                      quality:100
                  ) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
          footerLayout: file(relativePath: { eq: "marketing/footerLayout.png" }) {
              childImageSharp {
                  fluid(
                      maxWidth:1920
                      quality:100
                  ) {
                      ...GatsbyImageSharpFluid
                  }
              }
          }
      }
  `)
  console.log(data)
  return (
    <>
      <Img fluid={data.headerLayout.childImageSharp.fluid}/>
      {children}
      <Img fluid={data.footerLayout.childImageSharp.fluid}/>
    </>
  )
}


// @ts-ignore
export default Layout
