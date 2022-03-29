// Eventually will have eslint rules for Gatsby:
// https://github.com/gatsbyjs/gatsby/issues/2446
// Currently using linting recommendations from eslint,
// Prettier, and React:
// https://prettier.io/docs/en/eslint.html#why-not-both

import React from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider } from '@mui/material/styles'
import defaultTheme from 'src/themes/theme'

export const Layout = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

Layout.defaultProps = {}

Layout.displayName = 'Layout'

export default Layout
