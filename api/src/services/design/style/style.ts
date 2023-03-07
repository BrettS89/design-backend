// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  designStyleDataValidator,
  designStylePatchValidator,
  designStyleQueryValidator,
  designStyleResolver,
  designStyleExternalResolver,
  designStyleDataResolver,
  designStylePatchResolver,
  designStyleQueryResolver
} from './style.schema'

import type { Application } from '../../../declarations'
import { DesignStyleService, getOptions } from './style.class'
import { designStylePath, designStyleMethods } from './style.shared'

import { authenticate } from '../../../hooks/authenticate';

export * from './style.class'
export * from './style.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const designStyle = (app: Application) => {
  // Register our service on the Feathers application
  app.use(designStylePath, new DesignStyleService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: designStyleMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(designStylePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(designStyleExternalResolver),
        schemaHooks.resolveResult(designStyleResolver)
      ]
    },
    before: {
      all: [
        authenticate(),
        schemaHooks.validateQuery(designStyleQueryValidator),
        schemaHooks.resolveQuery(designStyleQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(designStyleDataValidator),
        schemaHooks.resolveData(designStyleDataResolver)
      ],
      patch: [
        schemaHooks.validateData(designStylePatchValidator),
        schemaHooks.resolveData(designStylePatchResolver)
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
    [designStylePath]: DesignStyleService
  }
}
