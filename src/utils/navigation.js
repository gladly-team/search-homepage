/* globals process */
export const domain = process.env.GATSBY_DOMAIN || 'search.gladly.io'
export const protocol = 'https'
export const baseURL = `${protocol}://${domain}`

export const homeURL = '/'
export const financialsURL = '/financials/'
export const helpURL = '/help/'
export const termsURL = '/terms/'
export const contactURL = '/contact/'
export const privacyPolicyURL = '/privacy/'

// Redirects
export const externalFinancialsURL = 'https://tab.gladly.io/financials/'
export const externalHelpURL =
  'https://gladly.zendesk.com/hc/en-us/categories/360001779552-Search-for-a-Cause'
export const externalTermsURL = 'https://tab.gladly.io/terms/'
export const externalContactURL =
  'https://gladly.zendesk.com/hc/en-us/requests/new'
export const externalPrivacyPolicyURL = 'https://tab.gladly.io/privacy/'

/**
 * Append the protocol and domain to return the
 * absolute URL of a path.
 * @return {string} The absolute URL
 */
export const getAbsoluteURL = (path) => {
  // If the passed path is already an absolute URL,
  // just return it.
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return `${baseURL}${path}`
}

/**
 * Set window.location to a new URL
 * @param {String} newURL - The URL to navigate to
 * @return {undefined}
 */
export const externalRedirect = (externalURL) => {
  window.location = externalURL
}
