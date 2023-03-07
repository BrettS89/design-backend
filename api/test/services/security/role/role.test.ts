// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../../src/app'

describe('security/role service', () => {
  it('registered the service', () => {
    const service = app.service('security/role')

    assert.ok(service, 'Registered the service')
  })
})
