import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Helmet from 'react-helmet'
import Header from 'src/components/Header'
import Link from 'src/components/Link'
import { homeURL } from 'src/utils/navigation'
import { withTheme } from '@material-ui/styles'
import styles from './404.module.css'
import Metadata from 'src/components/Metadata'

class NotFoundPage extends React.Component {
  render() {
    const { location } = this.props
    const openGraphTitle = 'Oops! No page here.'
    const openGraphDescription = 'This page seems to be missing.'
    return (
      <Metadata location={location}>
        <Header />
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Helmet title={'Missing page'}>
            <meta property="og:title" content={openGraphTitle} />
            <meta property="og:description" content={openGraphDescription} />
            <meta name="twitter:title" content={openGraphTitle} />
            <meta name="twitter:description" content={openGraphDescription} />
          </Helmet>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: 440,
              padding: 20,
            }}
          >
            <Typography variant={'h5'} gutterBottom>
              Oops! Nothing here.
            </Typography>
            <Typography
              variant={'body2'}
              style={{ marginBottom: 0, padding: '0px 20px' }}
            >
              Sorry about that! You probably weren't looking for cake, but have
              some cake anyway <span className={styles.cakeEmoji} />
            </Typography>
            <Link to={homeURL} style={{ margin: 18 }}>
              <Button variant="contained" color="primary" size="large">
                Head back home
              </Button>
            </Link>
          </div>
        </div>
      </Metadata>
    )
  }
}

NotFoundPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  theme: PropTypes.shape({
    palette: PropTypes.object,
  }).isRequired,
}

NotFoundPage.defaultProps = {
  theme: {},
}

export default withTheme(NotFoundPage)
