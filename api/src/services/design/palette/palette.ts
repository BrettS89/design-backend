// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  designPaletteDataValidator,
  designPalettePatchValidator,
  designPaletteQueryValidator,
  designPaletteResolver,
  designPaletteExternalResolver,
  designPaletteDataResolver,
  designPalettePatchResolver,
  designPaletteQueryResolver
} from './palette.schema'

import type { Application } from '../../../declarations'
import { DesignPaletteService, getOptions } from './palette.class'
import { designPalettePath, designPaletteMethods } from './palette.shared'

import { authenticate } from '../../../hooks/authenticate';

export * from './palette.class'
export * from './palette.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const designPalette = (app: Application) => {
  // Register our service on the Feathers application
  app.use(designPalettePath, new DesignPaletteService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: designPaletteMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(designPalettePath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(designPaletteExternalResolver),
        schemaHooks.resolveResult(designPaletteResolver)
      ]
    },
    before: {
      all: [
        authenticate(),
        schemaHooks.validateQuery(designPaletteQueryValidator),
        schemaHooks.resolveQuery(designPaletteQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(designPaletteDataValidator),
        schemaHooks.resolveData(designPaletteDataResolver)
      ],
      patch: [
        schemaHooks.validateData(designPalettePatchValidator),
        schemaHooks.resolveData(designPalettePatchResolver)
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
    [designPalettePath]: DesignPaletteService
  }
}
