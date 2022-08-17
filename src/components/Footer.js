import React from 'react'
import Divider from '@mui/material/Divider'
import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

import {
  contactURL,
  helpURL,
  financialsURL,
  privacyPolicyURL,
  termsURL,
} from 'src/utils/navigation'
import {
  lightestShadingColor,
  lighterTextColor,
  lightestTextColor,
} from 'src/themes/theme'
import Link from 'src/components/Link'

class Footer extends React.Component {
  render() {
    const { style } = this.props
    const footerLinkStyle = {
      color: lightestTextColor,
      fontSize: 12,
      margin: '0px 20px',
    }
    const hoverLinkStyle = {
      color: lighterTextColor,
    }
    return (
      <div
        style={Object.assign(
          {},
          {
            background: lightestShadingColor,
            paddingTop: 1,
            paddingBottom: 20,
            paddingLeft: 40,
            paddingRight: 40,
            width: '100%',
            boxSizing: 'border-box',
          },
          style
        )}
      >
        <Divider style={{ width: '100%', marginBottom: 20 }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'nowrap',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}
          >
            <Link
              to={financialsURL}
              style={footerLinkStyle}
              hoverStyle={hoverLinkStyle}
            >
              <Typography variant={'caption'}>Financials</Typography>
            </Link>
            <Link
              to={helpURL}
              style={footerLinkStyle}
              hoverStyle={hoverLinkStyle}
            >
              <Typography variant={'caption'}>FAQ</Typography>
            </Link>
            <Link
              to={termsURL}
              style={footerLinkStyle}
              hoverStyle={hoverLinkStyle}
            >
              <Typography variant={'caption'}>Terms</Typography>
            </Link>
            <Link
              to={privacyPolicyURL}
              style={footerLinkStyle}
              hoverStyle={hoverLinkStyle}
            >
              <Typography variant={'caption'}>Privacy</Typography>
            </Link>
            <Link
              to={contactURL}
              style={footerLinkStyle}
              hoverStyle={hoverLinkStyle}
            >
              <Typography variant={'caption'}>Contact</Typography>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

Footer.propTypes = {
  style: PropTypes.object,
}

Footer.defaultProps = {
  style: {},
}

export default Footer
