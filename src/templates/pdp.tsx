// Gatsby supports TypeScript natively!
import React, { useEffect,useState } from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"

const SecondPage = (props) => {
  const [test,setTest] = useState(false)
  useEffect(() => {
    console.log(props)
    setTimeout(()=>{
      setTest(true)
    },5000)
  }, [])

  return <Layout>
    <SEO title="Page two"/>
    <h1>Hi from the pdp </h1>
    <p>Welcome to pdp {props.pageContext.currentPage}</p>
    {
      test?<Link to="/app/login" style={{color:'red'}}>Go back to the homepage</Link>:null
    }
    <Link to="/" style={{color:'red'}}>Go back to the homepage</Link>
  </Layout>
}

export default SecondPage
