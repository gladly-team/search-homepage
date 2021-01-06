/* eslint-env jest */

import React from 'react'
import { mount, shallow } from 'enzyme'
import localStorageMgr from 'src/utils/local-storage'
import { getAbsoluteURL } from 'src/utils/navigation'
import MoneyRaisedDisplay from 'src/components/MoneyRaisedDisplay'
import Footer from 'src/components/Footer'
import Input from '@material-ui/core/Input'
import { externalRedirect } from 'src/utils/navigation'

jest.mock('src/utils/local-storage')
jest.mock('src/utils/location')
jest.mock('src/utils/navigation')
jest.mock('src/components/Footer')
jest.mock('src/components/Metadata')
jest.mock('src/components/MoneyRaisedDisplay')

const getMockProps = () => ({
  location: {
    pathname: '/',
  },
  pageContext: {},
})

afterEach(() => {
  jest.clearAllMocks()
  localStorageMgr.clear()
})

describe('index page', () => {
  it('renders without error', () => {
    const IndexPage = require('../index').default
    shallow(<IndexPage {...getMockProps()} />).dive()
  })

  it('stores the referrer ID in local storage when it is a vanity URL', () => {
    const IndexPage = require('../index').default

    // Gatsby will pass a referrer in the pageContext prop if it's
    // a page created for a vanity referrer URL.
    const mockProps = getMockProps()
    mockProps.pageContext = { referrer: { id: 123 } }
    shallow(<IndexPage {...mockProps} />).dive()
    expect(localStorageMgr.setItem).toHaveBeenCalledWith(
      'search.referralData.referringChannel',
      123
    )
    expect(localStorageMgr.setItem).toHaveBeenCalledTimes(1)
  })

  it('does not store a referrer ID in local storage when it is not a vanity URL', () => {
    const IndexPage = require('../index').default
    const mockProps = getMockProps()
    mockProps.pageContext = {}
    shallow(<IndexPage {...mockProps} />).dive()
    expect(localStorageMgr.setItem).not.toHaveBeenCalled()
  })

  it('stores the referrer ID in local storage when it is included as a URL parameter', () => {
    const IndexPage = require('../index').default

    const getUrlParameterValue = require('src/utils/location')
      .getUrlParameterValue
    getUrlParameterValue.mockImplementation((param) => {
      switch (param) {
        case 'r':
          return '234'
        default:
          return null
      }
    })

    shallow(<IndexPage {...getMockProps()} />).dive()
    expect(localStorageMgr.setItem).toHaveBeenCalledWith(
      'search.referralData.referringChannel',
      234111 // FIXME: intentionally broken to test CI
    )
    expect(localStorageMgr.setItem).toHaveBeenCalledTimes(1)
  })

  it('does not store a referrer ID in local storage when the referrer ID is not in the URL params', () => {
    const IndexPage = require('../index').default

    const getUrlParameterValue = require('src/utils/location')
      .getUrlParameterValue
    getUrlParameterValue.mockReturnValue(null)

    shallow(<IndexPage {...getMockProps()} />).dive()
    expect(localStorageMgr.setItem).not.toHaveBeenCalled()
  })

  it('does not store a referrer ID in local storage when the URL param referrer ID value is not an integer', () => {
    const IndexPage = require('../index').default

    const getUrlParameterValue = require('src/utils/location')
      .getUrlParameterValue
    getUrlParameterValue.mockImplementation((param) => {
      switch (param) {
        case 'r':
          return 'hello'
        default:
          return null
      }
    })

    shallow(<IndexPage {...getMockProps()} />).dive()
    expect(localStorageMgr.setItem).not.toHaveBeenCalled()
  })

  it('sets the canonical URL', () => {
    const IndexPage = require('../index').default
    getAbsoluteURL.mockReturnValue('https://somewebsite.com/')
    const wrapper = shallow(<IndexPage {...getMockProps()} />).dive()
    const elem = wrapper.find('link[rel="canonical"]')
    expect(elem.exists()).toBe(true)
    expect(elem.prop('href')).toBe('https://somewebsite.com/')
  })

  it('stores the referring user in local storage when it is included as a URL parameter', () => {
    const IndexPage = require('../index').default
    const getUrlParameterValue = require('src/utils/location')
      .getUrlParameterValue
    getUrlParameterValue.mockImplementation((param) => {
      switch (param) {
        case 'u':
          return 'bobert'
        default:
          return null
      }
    })

    shallow(<IndexPage {...getMockProps()} />).dive()
    expect(localStorageMgr.setItem).toHaveBeenCalledWith(
      'search.referralData.referringUser',
      'bobert'
    )
    expect(localStorageMgr.setItem).toHaveBeenCalledTimes(1)
  })

  it('does not store a referrer ID in local storage when the referrer ID is not in the URL params', () => {
    const IndexPage = require('../index').default
    const getUrlParameterValue = require('src/utils/location')
      .getUrlParameterValue
    getUrlParameterValue.mockReturnValue(null)

    shallow(<IndexPage {...getMockProps()} />).dive()
    expect(localStorageMgr.setItem).not.toHaveBeenCalled()
  })

  it('renders the MoneyRaisedDisplay', () => {
    const IndexPage = require('../index').default
    const wrapper = shallow(<IndexPage {...getMockProps()} />).dive()
    expect(wrapper.find(MoneyRaisedDisplay).exists()).toBe(true)
  })

  it('renders the Footer', () => {
    const IndexPage = require('../index').default
    const wrapper = shallow(<IndexPage {...getMockProps()} />).dive()
    expect(wrapper.find(Footer).exists()).toBe(true)
  })

  it('redirects to the SERP when hitting enter in the search bar', () => {
    const IndexPage = require('../index').default
    const mockProps = getMockProps()
    const wrapper = mount(<IndexPage {...mockProps} />)
    const searchInput = wrapper.find(Input).first().find('input')

    // https://github.com/airbnb/enzyme/issues/76#issuecomment-423774243
    searchInput.instance().value = 'register to vote'
    searchInput.simulate('keypress', { key: 'Enter' })
    expect(externalRedirect).toHaveBeenCalledWith(
      'https://tab.gladly.io/search?q=register%20to%20vote&src=self'
    )
  })

  it('redirects to the SERP when clicking the search icon', () => {
    const IndexPage = require('../index').default
    const mockProps = getMockProps()
    const wrapper = mount(<IndexPage {...mockProps} />)
    const searchInput = wrapper.find(Input).first().find('input')

    searchInput.instance().value = 'pizza'
    searchInput.simulate('keypress', { key: 'Enter' })
    expect(externalRedirect).toHaveBeenCalledWith(
      'https://tab.gladly.io/search?q=pizza&src=self'
    )
  })
})
