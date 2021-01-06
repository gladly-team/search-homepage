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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `./src/data/`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: baseURL,
        sitemap: `${baseURL}/sitemap.xml`,
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://38d9e31224b04e4aba61274d50ca3cca@sentry.io/1467750',
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        // https://github.com/jariz/gatsby-plugin-s3#configuration
        bucketName: process.env.GATSBY_S3_BUCKET_NAME,
        removeNonexistentObjects: false,
        acl: null,
      },
    },
  ],
}
