import React from 'react'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'

import {
  externalContactUsURL,
  externalHelpURL,
  financialsURL,
  privacyPolicyURL,
  termsURL,
} from 'src/utils/navigation'
import logoGrey from 'src/img/logo-grey.svg'
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
      margin: 20,
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
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap: 'nowrap',
              alignItems: 'center',
            }}
          >
            <Link to="/">
              <img src={logoGrey} style={{ height: 43 }} />
            </Link>
            <div
              style={{
                marginLeft: 30,
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
                Financials
              </Link>
              <Link
                to={externalHelpURL}
                style={footerLinkStyle}
                hoverStyle={hoverLinkStyle}
              >
                FAQ
              </Link>
              <Link
                to={termsURL}
                style={footerLinkStyle}
                hoverStyle={hoverLinkStyle}
              >
                Terms
              </Link>
              <Link
                to={privacyPolicyURL}
                style={footerLinkStyle}
                hoverStyle={hoverLinkStyle}
              >
                Privacy
              </Link>
              <Link
                to={externalContactUsURL}
                style={footerLinkStyle}
                hoverStyle={hoverLinkStyle}
              >
                Contact
              </Link>
            </div>
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
