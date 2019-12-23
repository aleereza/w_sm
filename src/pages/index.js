import React from "react"
import SEO from "../components/seo"
import Cards from "../components/level1/cards"

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <h1>Hi, this is the home page</h1>
    <Cards>
      <Cards.Card />
      <Cards.Card />
      <Cards.Card />
      <Cards.Card />
    </Cards>
  </>
)

export default IndexPage
