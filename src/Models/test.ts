import { graphql } from "gatsby"

export default {
  namespace: "test",
  state: {
    test: 21,
    site: {}
  },
  reducers: {
    update(state, { payload: { number } }) {

      const site = graphql`
          query {
              site {
                  siteMetadata {
                      title
                      description
                      author
                  }
              }
          }
      `
      return {
        site,
        test: number
      }
    }
  }
}
