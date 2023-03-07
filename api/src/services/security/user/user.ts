// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  securityUserDataValidator,
  securityUserPatchValidator,
  securityUserQueryValidator,
  securityUserResolver,
  securityUserExternalResolver,
  securityUserDataResolver,
  securityUserPatchResolver,
  securityUserQueryResolver
} from './user.schema'

import type { Application } from '../../../declarations'
import { SecurityUserService, getOptions } from './user.class'
import { securityUserPath, securityUserMethods } from './user.shared'

export * from './user.class'
export * from './user.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const securityUser = (app: Application) => {
  // Register our service on the Feathers application
  app.use(securityUserPath, new SecurityUserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: securityUserMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(securityUserPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(securityUserExternalResolver),
        schemaHooks.resolveResult(securityUserResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(securityUserQueryValidator),
        schemaHooks.resolveQuery(securityUserQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(securityUserDataValidator),
        schemaHooks.resolveData(securityUserDataResolver)
      ],
      patch: [
        schemaHooks.validateData(securityUserPatchValidator),
        schemaHooks.resolveData(securityUserPatchResolver)
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
    [securityUserPath]: SecurityUserService
  }
}
