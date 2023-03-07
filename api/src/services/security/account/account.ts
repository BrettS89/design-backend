// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  securityAccountDataValidator,
  securityAccountPatchValidator,
  securityAccountQueryValidator,
  securityAccountResolver,
  securityAccountExternalResolver,
  securityAccountDataResolver,
  securityAccountPatchResolver,
  securityAccountQueryResolver
} from './account.schema'

import type { Application } from '../../../declarations'
import { SecurityAccountService, getOptions } from './account.class'
import { securityAccountPath, securityAccountMethods } from './account.shared'

import { authenticate } from '../../../hooks/authenticate';

export * from './account.class'
export * from './account.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const securityAccount = (app: Application) => {
  // Register our service on the Feathers application
  app.use(securityAccountPath, new SecurityAccountService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: securityAccountMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(securityAccountPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(securityAccountExternalResolver),
        schemaHooks.resolveResult(securityAccountResolver)
      ]
    },
    before: {
      all: [
        authenticate(),
        schemaHooks.validateQuery(securityAccountQueryValidator),
        schemaHooks.resolveQuery(securityAccountQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(securityAccountDataValidator),
        schemaHooks.resolveData(securityAccountDataResolver)
      ],
      patch: [
        schemaHooks.validateData(securityAccountPatchValidator),
        schemaHooks.resolveData(securityAccountPatchResolver)
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
    [securityAccountPath]: SecurityAccountService
  }
}
