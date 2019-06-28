/* globals process */
export const domain = process.env.GATSBY_DOMAIN || 'search.gladly.io'
export const protocol = 'https'
export const baseURL = `${protocol}://${domain}`

export const homeURL = '/'
export const financialsURL = 'https://tab.gladly.io/financials/'
export const termsURL = 'https://tab.gladly.io/terms/'
export const privacyPolicyURL = 'https://tab.gladly.io/privacy/'
export const adblockerWhitelistingURL =
  'https://tab.gladly.io/adblockers/search/'

// Zendesk
export const externalHelpURL =
  'https://gladly.zendesk.com/hc/en-us/categories/201939608-Tab-for-a-Cause'
export const externalContactUsURL =
  'https://gladly.zendesk.com/hc/en-us/requests/new'

/**
 * Append the protocol and domain to return the
 * absolute URL of a path.
 * @return {string} The absolute URL
 */
export const getAbsoluteURL = path => {
  // If the passed path is already an absolute URL,
  // just return it.
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return `${baseURL}${path}`
}
