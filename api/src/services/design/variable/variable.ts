// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  designVariableDataValidator,
  designVariablePatchValidator,
  designVariableQueryValidator,
  designVariableResolver,
  designVariableExternalResolver,
  designVariableDataResolver,
  designVariablePatchResolver,
  designVariableQueryResolver
} from './variable.schema'

import type { Application } from '../../../declarations'
import { DesignVariableService, getOptions } from './variable.class'
import { designVariablePath, designVariableMethods } from './variable.shared'

import { authenticate } from '../../../hooks/authenticate';

export * from './variable.class'
export * from './variable.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const designVariable = (app: Application) => {
  // Register our service on the Feathers application
  app.use(designVariablePath, new DesignVariableService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: designVariableMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(designVariablePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(designVariableExternalResolver),
        schemaHooks.resolveResult(designVariableResolver)
      ]
    },
    before: {
      all: [
        authenticate(),
        schemaHooks.validateQuery(designVariableQueryValidator),
        schemaHooks.resolveQuery(designVariableQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(designVariableDataValidator),
        schemaHooks.resolveData(designVariableDataResolver)
      ],
      patch: [
        schemaHooks.validateData(designVariablePatchValidator),
        schemaHooks.resolveData(designVariablePatchResolver)
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
    [designVariablePath]: DesignVariableService
  }
}
