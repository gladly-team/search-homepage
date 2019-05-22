/* eslint-env jest */
/* globals process */

afterEach(() => {
  delete process.env.GATSBY_DOMAIN
  jest.resetModules()
})

describe('navigation utils', () => {
  test('getAbsoluteURL works for a passed path', () => {
    // Set the domain env var
    process.env.GATSBY_DOMAIN = 'some.example.com'

    const getAbsoluteURL = require('../navigation').getAbsoluteURL
    expect(getAbsoluteURL('/')).toBe('https://some.example.com/')
    expect(getAbsoluteURL('/blah/')).toBe('https://some.example.com/blah/')
  })

  test('getAbsoluteURL does not modify a URL that is already absolute', () => {
    // Set the domain env var
    process.env.GATSBY_DOMAIN = 'some.example.com'

    const getAbsoluteURL = require('../navigation').getAbsoluteURL
    expect(getAbsoluteURL('https://foo.com/blah/')).toBe(
      'https://foo.com/blah/'
    )
  })

  test('getAbsoluteURL works for a passed path, falling back on hardcoded production domain', () => {
    const getAbsoluteURL = require('../navigation').getAbsoluteURL
    expect(getAbsoluteURL('/')).toBe('https://search.gladly.io/')
    expect(getAbsoluteURL('/blah/')).toBe('https://search.gladly.io/blah/')
  })

  test('getAbsoluteURL does not modify a URL that is already absolute,falling back on hardcoded production domain', () => {
    const getAbsoluteURL = require('../navigation').getAbsoluteURL
    expect(getAbsoluteURL('https://search.gladly.io/blah/')).toBe(
      'https://search.gladly.io/blah/'
    )
  })
})
