import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Layout from 'src/components/Layout'
import { getAbsoluteURL, homeURL } from 'src/utils/navigation'
import localStorageMgr from 'src/utils/local-storage'
import {
  STORAGE_REFERRAL_DATA_REFERRING_CHANNEL,
  STORAGE_REFERRAL_DATA_REFERRING_USER,
} from 'src/utils/constants'
import { getUrlParameterValue } from 'src/utils/location'

// import styles from './index.module.css'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showUnsupportedBrowserMessage: false,
    }
  }

  componentDidMount() {
    // Check if the user came from referring channel (a non-user
    // referral source); if so, and store the referrer ID.
    if (this.isReferralFromChannel()) {
      const refId = this.getReferringChannelId()
      this.storeReferringChannel(refId)
    }

    // Check if user came from a user referral and store the
    // referrer's user ID.
    const referringUser = this.getReferringUserUsername()
    if (referringUser !== null && referringUser !== undefined) {
      this.storeReferringUser(referringUser)
    }
  }

  /**
   * Return the referring channel ID (a non-user referral source)
   * if it exists, or null.
   * @return {integer|null} The referrer ID
   */
  getReferringChannelId() {
    const { pageContext } = this.props
    let referrerId = null

    // Check for a referrer's vanity URL.
    if (pageContext && pageContext.referrer) {
      referrerId = pageContext.referrer.id
    } else {
      // Check for a referrer's URL parameter.
      try {
        const paramRefId = parseInt(getUrlParameterValue('r'))
        if (!isNaN(paramRefId)) {
          referrerId = paramRefId
        }
        /* eslint-disable-next-line no-empty */
      } catch (e) {}
    }
    return referrerId
  }

  /**
   * Return whether this user arrived from a referral channel.
   * @return {Boolean} Whether this is a non-user referral
   */
  isReferralFromChannel() {
    const refId = this.getReferringChannelId()
    return refId !== null && refId !== undefined
  }

  /**
   * Store the referring channel ID in local storage.
   * @return {undefined}
   */
  storeReferringChannel(referrerId) {
    localStorageMgr.setItem(STORAGE_REFERRAL_DATA_REFERRING_CHANNEL, referrerId)
  }

  /**
   * Return the referring user's username (from URL param)
   * if it exists, or null.
   * @return {string|null} The referring user's username
   */
  getReferringUserUsername() {
    return getUrlParameterValue('u')
  }

  /**
   * Store the referring username in local storage.
   * @return {undefined}
   */
  storeReferringUser(referringUser) {
    localStorageMgr.setItem(STORAGE_REFERRAL_DATA_REFERRING_USER, referringUser)
  }

  showUnsupportedBrowserMessage() {
    this.setState({
      showUnsupportedBrowserMessage: true,
    })
  }

  hideUnsupportedBrowserMessage() {
    this.setState({
      showUnsupportedBrowserMessage: false,
    })
  }

  render() {
    const { location } = this.props

    // Always set the canonical URL to the homepage, which will
    // consolidate any pages using vanity URL paths or referral
    // parameters. Change this if any parameters or paths serve
    // substantially different content.
    const canonicalURL = getAbsoluteURL(homeURL)
    return (
      <Layout location={location}>
        <div>
          <Helmet>
            <link rel="canonical" href={canonicalURL} />
          </Helmet>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p>Coming soon.</p>
          </div>
        </div>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  pageContext: PropTypes.shape({
    referrer: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}

export default IndexPage
