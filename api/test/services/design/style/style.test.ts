// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../../src/app'

describe('design/style service', () => {
  it('registered the service', () => {
    const service = app.service('design/style')

    assert.ok(service, 'Registered the service')
  })
})
