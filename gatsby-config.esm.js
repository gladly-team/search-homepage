/* globals process */

var domain = process.env.GATSBY_DOMAIN || 'search.gladly.io'
var protocol = 'https'
var baseURL = `${protocol}://${domain}`

module.exports = {
  siteMetadata: {
    title: 'Search for a Cause',
    domain: `${domain}`,
    siteUrl: `https://${domain}`,
    keywords:
      'search for a cause, charity, search, cause, giving, extension, browser, advertising',
    descriptionLong:
      "Raise money for charity every time you search. It doesn't cost you a thing.",
    descriptionShort: 'Raise money for charity every time you search.',
    metaTagCallToAction: 'Join me on Search for a Cause!',
    twitterHandle: '@TabForACause',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    // Handle server-side rendering MaterialUI styles:
    // https://github.com/hupe1980/gatsby-plugin-material-ui/tree/master
    {
      resolve: `gatsby-plugin-material-ui`,
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/themes/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `./src/data/`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Exclude pages that just redirect.
        exclude: ['/help', '/contact'],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: baseURL,
        sitemap: `${baseURL}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    // TODO: update ID
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://8cb64ec80165437b98905b07296ddc3f@sentry.io/1232334',
      },
    },
  ],
}
