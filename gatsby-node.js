/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// Promise API
const path = require(`path`)

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
exports.onCreateNode = ({ node }) => {
}
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  console.log('onCreatePage',page.path)
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`
    // Update the page.
    createPage(page)
  }
}
exports.onCreateWebpackConfig = ({
                                   stage,
                                   rules,
                                   loaders,
                                   plugins,
                                   actions
                                 }) => {

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@@': path.resolve(__dirname)
      },
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    }
  })
}
