/* eslint-env jest */
import React from 'react'
import PropTypes from 'prop-types'

const Metadata = ({ children }) => <div>{children}</div>

Metadata.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

Metadata.displayName = 'Metadata'

export default Metadata
