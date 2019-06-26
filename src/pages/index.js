import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Helmet from 'react-helmet'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

import logoWithText from 'src/img/logo-with-text.svg'
import Metadata from 'src/components/Metadata'
import { getAbsoluteURL, homeURL } from 'src/utils/navigation'
import localStorageMgr from 'src/utils/local-storage'
import {
  STORAGE_REFERRAL_DATA_REFERRING_CHANNEL,
  STORAGE_REFERRAL_DATA_REFERRING_USER,
} from 'src/utils/constants'
import { getUrlParameterValue } from 'src/utils/location'

const searchBoxBorderColor = '#ced4da'
const searchBoxBorderColorFocused = '#bdbdbd'

const styles = theme => ({
  pageContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  centerContent: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 80,
    width: 500,
    maxWidth: '80%',
    minWidth: 300,
  },
  logo: {
    height: 60,
    marginBottom: 26,
  },
  inputRootStyle: {
    padding: 0,
    borderRadius: 28,
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${searchBoxBorderColor}`,
    fontSize: 16,
    boxShadow: '0rem 0rem 0.02rem 0.02rem rgba(0, 0, 0, 0.1)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      borderColor: searchBoxBorderColorFocused,
      boxShadow: '0rem 0.05rem 0.2rem 0.05rem rgba(0, 0, 0, 0.1)',
    },
  },
  inputRootFocused: {
    borderColor: searchBoxBorderColorFocused,
    boxShadow: '0rem 0.05rem 0.2rem 0.05rem rgba(0, 0, 0, 0.1)',
  },
  inputStyle: {
    padding: '12px 16px',
  },
})

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
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

  search() {
    const { query } = this.state
    window.location = `https://tab.gladly.io/search?q=${encodeURIComponent(
      query
    )}&src=self`
  }

  render() {
    const { classes, location } = this.props

    // Always set the canonical URL to the homepage, which will
    // consolidate any pages using vanity URL paths or referral
    // parameters. Change this if any parameters or paths serve
    // substantially different content.
    const canonicalURL = getAbsoluteURL(homeURL)
    return (
      <Metadata location={location}>
        <Helmet>
          <link rel="canonical" href={canonicalURL} />
        </Helmet>
        <div className={classes.pageContainer}>
          <div className={classes.centerContent}>
            <img src={logoWithText} className={classes.logo} />
            <div>
              <Input
                autoFocus
                data-test-id={'search-input'}
                type={'text'}
                onChange={e => {
                  this.setState({
                    query: e.target.value,
                  })
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    this.search()
                  }
                }}
                placeholder={'Search to raise money for charity...'}
                disableUnderline
                fullWidth
                classes={{
                  root: classes.inputRootStyle,
                  input: classes.inputStyle,
                  focused: classes.inputRootFocused,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Search button"
                      onClick={this.search.bind(this)}
                    >
                      <SearchIcon
                        style={{ color: searchBoxBorderColorFocused }}
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </div>
          </div>
        </div>
      </Metadata>
    )
  }
}

IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  pageContext: PropTypes.shape({
    referrer: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}

IndexPage.defaultProps = {}

export default withStyles(styles, { withTheme: true })(IndexPage)
