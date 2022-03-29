/* eslint-env jest */

// import fbq from '../facebook-analytics'
import ga from '../google-analytics'

jest.mock('../facebook-analytics')
jest.mock('../google-analytics')

afterEach(() => {
  jest.clearAllMocks()
})

/**
 * Flush the Promise resolution queue. See:
 * https://github.com/facebook/jest/issues/2157
 * @return {Promise<undefined>}
 */
// See latest:
// https://github.com/facebook/jest/issues/2157#issuecomment-897935688
const flushAllPromises = async () =>
  new Promise(jest.requireActual('timers').setImmediate)

describe('logEvent', () => {
  test('downloadButtonClick resolves when GA calls the hitCallback', async () => {
    expect.assertions(2)

    var hitCallback
    ga.mockImplementation((action, options) => {
      hitCallback = options.hitCallback
    })

    const downloadButtonClick = require('../logEvent').downloadButtonClick
    const promise = downloadButtonClick()
    promise.done = false
    promise.then(() => {
      promise.done = true
    })

    await flushAllPromises()

    expect(promise.done).toBe(false)

    // Mock firing the GA hitCallback
    hitCallback()

    await flushAllPromises()

    expect(promise.done).toBe(true)
  })

  test('downloadButtonClick resolves after some time if GA does not call the hitCallback', async () => {
    expect.assertions(2)

    jest.useFakeTimers()

    const downloadButtonClick = require('../logEvent').downloadButtonClick
    const promise = downloadButtonClick()
    promise.done = false
    promise.then(() => {
      promise.done = true
    })

    // Advance timers, but not past the timeout value.
    jest.advanceTimersByTime(50)

    await flushAllPromises()

    expect(promise.done).toBe(false)

    // Advance timers past the timeout value.
    jest.advanceTimersByTime(2000)

    await flushAllPromises()

    expect(promise.done).toBe(true)
  })
})
