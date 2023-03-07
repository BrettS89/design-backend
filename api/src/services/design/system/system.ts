// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  designSystemDataValidator,
  designSystemPatchValidator,
  designSystemQueryValidator,
  designSystemResolver,
  designSystemExternalResolver,
  designSystemDataResolver,
  designSystemPatchResolver,
  designSystemQueryResolver
} from './system.schema'

import type { Application } from '../../../declarations'
import { DesignSystemService, getOptions } from './system.class'
import { designSystemPath, designSystemMethods } from './system.shared'

import { authenticate } from '../../../hooks/authenticate';

export * from './system.class'
export * from './system.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const designSystem = (app: Application) => {
  // Register our service on the Feathers application
  app.use(designSystemPath, new DesignSystemService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: designSystemMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(designSystemPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(designSystemExternalResolver),
        schemaHooks.resolveResult(designSystemResolver)
      ]
    },
    before: {
      all: [
        authenticate(),
        schemaHooks.validateQuery(designSystemQueryValidator),
        schemaHooks.resolveQuery(designSystemQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(designSystemDataValidator),
        schemaHooks.resolveData(designSystemDataResolver)
      ],
      patch: [
        schemaHooks.validateData(designSystemPatchValidator),
        schemaHooks.resolveData(designSystemPatchResolver)
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
    [designSystemPath]: DesignSystemService
  }
}
