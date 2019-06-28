/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
jest.mock('src/img/opengraph-img.png', () => '/static/some-image.png')

const getMockProps = () => ({
  children: null,
  data: {
    site: {
      siteMetadata: {
        domain: 'example.com',
        descriptionLong: 'This is a very long example description',
        descriptionShort: 'A shorter description',
        keywords: 'here, are, keywords',
        metaTagCallToAction: 'Check this out!',
        title: 'My Example Site',
        twitterHandle: '@example',
      },
    },
  },
  location: {
    pathname: '/',
  },
})

describe('index layout page', () => {
  it('renders without error', () => {
    const { MetadataContent } = require('../Metadata')
    shallow(<MetadataContent {...getMockProps()} />)
  })

  it('sets the canonical URL', () => {
    const { MetadataContent } = require('../Metadata')
    const wrapper = shallow(<MetadataContent {...getMockProps()} />)
    const elem = wrapper.find('link[rel="canonical"]')
    expect(elem.prop('href')).toBe('https://search.gladly.io/')
  })

  it('sets the default page title using Helmet', () => {
    const { MetadataContent } = require('../Metadata')
    const wrapper = shallow(<MetadataContent {...getMockProps()} />)
    const elem = wrapper.find(Helmet)
    expect(elem.prop('defaultTitle')).toBe('My Example Site')
  })

  it('sets the open graph title to the call-to-action text', () => {
    const { MetadataContent } = require('../Metadata')
    const wrapper = shallow(<MetadataContent {...getMockProps()} />)
    const elem = wrapper.find('meta[property="og:title"]')
    expect(elem.prop('content')).toBe('Check this out!')
  })

  it('sets the open graph description', () => {
    const { MetadataContent } = require('../Metadata')
    const wrapper = shallow(<MetadataContent {...getMockProps()} />)
    const elem = wrapper.find('meta[property="og:description"]')
    expect(elem.prop('content')).toBe('A shorter description')
  })

  it('sets the open graph image', () => {
    const { MetadataContent } = require('../Metadata')
    const wrapper = shallow(<MetadataContent {...getMockProps()} />)
    const elem = wrapper.find('meta[property="og:image"]')
    expect(elem.prop('content')).toBe(
      'https://search.gladly.io/static/some-image.png'
    )
  })
})
