/* eslint-env jest */

// Most exported values are strings, so just mock
// what we need to change.
const navigation = require.requireActual('../navigation')

navigation.getAbsoluteURL = jest.fn((path) => `https://example.com${path}`)

navigation.externalRedirect = jest.fn()

module.exports = navigation
