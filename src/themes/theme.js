import { createTheme } from '@mui/material/styles'

export const textColor = 'rgba(0, 0, 0, 0.87)'
export const lighterTextColor = 'rgba(0, 0, 0, 0.64)'
export const lightestTextColor = 'rgba(0, 0, 0, 0.44)'

// Shading

// On white, equivalent to #838383
export const lightShadingColor = 'rgba(128, 128, 128, 0.40)'

// On white, equivalent to #ededed
export const lighterShadingColor = 'rgba(128, 128, 128, 0.14)'

// On white, equivalent to #fafafa
export const lightestShadingColor = 'rgba(128, 128, 128, 0.04)'
export const lightestShadingColorNoOpacity = '#fafafa'

// Theme
export const primaryMainColor = '#00b597'
export const primaryContrastTextColor = '#fff'
export const secondaryMainColor = '#4a90e2'
export const secondaryContrastTextColor = '#fff'

const theme = createTheme({
  palette: {
    background: {
      // This value changes the HTML background color:
      // https://material-ui.com/api/css-baseline/
      default: '#fff',
    },
    primary: {
      // light: will be calculated from palette.primary.main,
      main: primaryMainColor,
      // dark: will be calculated from palette.primary.main,
      contrastText: primaryContrastTextColor,
    },
    secondary: {
      // light: will be calculated from palette.primary.main,
      main: secondaryMainColor,
      // dark: will be calculated from palette.primary.main,
      contrastText: secondaryContrastTextColor,
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 14,
    useNextVariants: true,
    h1: {
      color: textColor,
      fontWeight: '500',
    },
    h2: {
      color: textColor,
    },
    h3: {
      color: lighterTextColor,
    },
    h4: {
      color: lighterTextColor,
    },
    h5: {
      color: lighterTextColor,
      lineHeight: '1.24',
    },
    h6: {
      color: lighterTextColor,
      lineHeight: '1.24',
    },
    body2: {
      color: lightestTextColor,
      lineHeight: '1.24',
    },
    body1: {
      color: lightestTextColor,
    },
    caption: {
      color: lightestTextColor,
    },
  },
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        fontWeight: '500',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: lighterShadingColor,
      },
    },
  },
})

export default theme
