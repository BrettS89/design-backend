// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  securityRoleDataValidator,
  securityRolePatchValidator,
  securityRoleQueryValidator,
  securityRoleResolver,
  securityRoleExternalResolver,
  securityRoleDataResolver,
  securityRolePatchResolver,
  securityRoleQueryResolver
} from './role.schema'

import type { Application } from '../../../declarations'
import { SecurityRoleService, getOptions } from './role.class'
import { securityRolePath, securityRoleMethods } from './role.shared'

export * from './role.class'
export * from './role.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const securityRole = (app: Application) => {
  // Register our service on the Feathers application
  app.use(securityRolePath, new SecurityRoleService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: securityRoleMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(securityRolePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(securityRoleExternalResolver),
        schemaHooks.resolveResult(securityRoleResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(securityRoleQueryValidator),
        schemaHooks.resolveQuery(securityRoleQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(securityRoleDataValidator),
        schemaHooks.resolveData(securityRoleDataResolver)
      ],
      patch: [
        schemaHooks.validateData(securityRolePatchValidator),
        schemaHooks.resolveData(securityRolePatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    [securityRolePath]: SecurityRoleService
  }
}
