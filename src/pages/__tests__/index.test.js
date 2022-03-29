/* eslint-env jest */

import React from 'react'
import { mount, shallow } from 'enzyme'
import localStorageMgr from 'src/utils/local-storage'
import { getAbsoluteURL } from 'src/utils/navigation'
import MoneyRaisedDisplay from 'src/components/MoneyRaisedDisplay'
import Footer from 'src/components/Footer'
import Input from '@mui/material/Input'
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

  it('sets the canonical URL', () => {
    const IndexPage = require('../index').default
    getAbsoluteURL.mockReturnValue('https://somewebsite.com/')
    const wrapper = shallow(<IndexPage {...getMockProps()} />).dive()
    const elem = wrapper.find('link[rel="canonical"]')
    expect(elem.exists()).toBe(true)
    expect(elem.prop('href')).toBe('https://somewebsite.com/')
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
