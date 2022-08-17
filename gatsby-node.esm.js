/* globals exports */

import path from 'path'
import {
  financialsURL,
  externalFinancialsURL,
  helpURL,
  externalHelpURL,
  termsURL,
  externalTermsURL,
  contactURL,
  externalContactURL,
  privacyPolicyURL,
  externalPrivacyPolicyURL,
} from './src/utils/navigation'

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Implement the Gatsby API "createPages". This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // Create landing page variants for referrers.
  const homepage = path.resolve(`src/pages/index.js`)
  const response = await graphql(`
    {
      allReferrersYaml(limit: 5000) {
        edges {
          node {
            path
            referrerId
          }
        }
      }
    }
  `)
  response.data.allReferrersYaml.edges.forEach(({ node }) => {
    // Not all referrers will have a vanity URL.
    if (!node.path || !node.referrerId) {
      return
    }
    createPage({
      path: `${node.path}/`,
      component: homepage,
      context: {
        referrer: {
          id: node.referrerId,
        },
      },
    })
  })

  // Create redirects for some pages.
  const { createRedirect } = actions
  createRedirect({
    fromPath: financialsURL,
    toPath: externalFinancialsURL,
  })
  createRedirect({
    fromPath: helpURL,
    toPath: externalHelpURL,
  })
  createRedirect({
    fromPath: termsURL,
    toPath: externalTermsURL,
  })
  createRedirect({
    fromPath: contactURL,
    toPath: externalContactURL,
  })
  createRedirect({
    fromPath: privacyPolicyURL,
    toPath: externalPrivacyPolicyURL,
  })
}
