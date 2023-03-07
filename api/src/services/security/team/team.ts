// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  securityTeamDataValidator,
  securityTeamPatchValidator,
  securityTeamQueryValidator,
  securityTeamResolver,
  securityTeamExternalResolver,
  securityTeamDataResolver,
  securityTeamPatchResolver,
  securityTeamQueryResolver
} from './team.schema'

import type { Application } from '../../../declarations'
import { SecurityTeamService, getOptions } from './team.class'
import { securityTeamPath, securityTeamMethods } from './team.shared'

export * from './team.class'
export * from './team.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const securityTeam = (app: Application) => {
  // Register our service on the Feathers application
  app.use(securityTeamPath, new SecurityTeamService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: securityTeamMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(securityTeamPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(securityTeamExternalResolver),
        schemaHooks.resolveResult(securityTeamResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(securityTeamQueryValidator),
        schemaHooks.resolveQuery(securityTeamQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(securityTeamDataValidator),
        schemaHooks.resolveData(securityTeamDataResolver)
      ],
      patch: [
        schemaHooks.validateData(securityTeamPatchValidator),
        schemaHooks.resolveData(securityTeamPatchResolver)
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
    [securityTeamPath]: SecurityTeamService
  }
}
