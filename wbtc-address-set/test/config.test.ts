import { expect } from 'chai'
import { util } from '@chainlink/ea-bootstrap'
import { ENV_API_ENDPOINT, getConfig } from '../src/config'

describe('config', () => {
  beforeEach(() => {
    delete process.env[ENV_API_ENDPOINT]
  })

  context('when no env is set', () => {
    it(`throws RequiredEnvError for ${ENV_API_ENDPOINT}`, () => {
      expect(() => util.getRequiredEnv(ENV_API_ENDPOINT)) //
        .throws(util.RequiredEnvError, ENV_API_ENDPOINT)
    })
  })

  context(`when ${ENV_API_ENDPOINT} is set`, () => {
    beforeEach(() => {
      process.env[ENV_API_ENDPOINT] = 'dummy.endpoint'
    })

    it(`configures app with ${ENV_API_ENDPOINT} endpoint`, () => {
      const config = getConfig()
      expect(config).to.have.property('api')
      expect(config.api).to.have.property('baseURL', 'dummy.endpoint')
    })
  })
})
