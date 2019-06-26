import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import { ThemeProvider } from '@material-ui/styles'
import defaultTheme from 'src/themes/theme'
import Favicon from 'src/img/logo32x32.png'
import openGraphImg from 'src/img/opengraph-img.png'
import { domain, getAbsoluteURL } from 'src/utils/navigation'

export const LayoutContent = props => {
  const { children, data, location } = props
  const absoluteUrl = getAbsoluteURL(location.pathname)
  const openGraphImgAbsolutePath = getAbsoluteURL(openGraphImg)

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          background: '#fff',
        }}
      >
        <div
          style={{
            flex: '1 0 auto',
          }}
        >
          <Helmet
            titleTemplate={`%s - ${data.site.siteMetadata.title}`}
            defaultTitle={data.site.siteMetadata.title}
          >
            <meta
              name="description"
              content={data.site.siteMetadata.descriptionLong}
            />
            <meta name="keywords" content={data.site.siteMetadata.keywords} />
            <link rel="canonical" href={absoluteUrl} />
            <link rel="icon" href={Favicon} />
            <meta property="og:type" content="website" />
            <meta property="fb:app_id" content="774381839264847" />
            <meta property="og:url" content={absoluteUrl} />
            <meta
              property="og:title"
              content={data.site.siteMetadata.metaTagCallToAction}
            />
            <meta
              property="og:description"
              content={data.site.siteMetadata.descriptionShort}
            />
            <meta property="og:image" content={openGraphImgAbsolutePath} />
            <meta
              name="twitter:title"
              content={data.site.siteMetadata.metaTagCallToAction}
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:description"
              content={data.site.siteMetadata.descriptionShort}
            />
            <meta
              name="twitter:site"
              content={data.site.siteMetadata.twitterHandle}
            />
            <meta
              name="twitter:creator"
              content={data.site.siteMetadata.twitterHandle}
            />
            <meta name="twitter:image" content={openGraphImgAbsolutePath} />
            <meta name="twitter:domain" content={domain} />
          </Helmet>
          <div
            style={{
              paddingTop: 0,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

LayoutContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        descriptionLong: PropTypes.string.isRequired,
        descriptionShort: PropTypes.string.isRequired,
        keywords: PropTypes.string.isRequired,
        metaTagCallToAction: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        twitterHandle: PropTypes.string.isRequired,
      }),
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
}

LayoutContent.displayName = 'LayoutContent'

const Layout = props => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            descriptionLong
            descriptionShort
            keywords
            metaTagCallToAction
            title
            twitterHandle
          }
        }
      }
    `}
    render={data => (
      <LayoutContent data={data} {...props}>
        {props.children}
      </LayoutContent>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

Layout.displayName = 'Layout'

export default Layout
