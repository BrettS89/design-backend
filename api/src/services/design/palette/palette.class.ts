// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type {
  DesignPalette,
  DesignPaletteData,
  DesignPalettePatch,
  DesignPaletteQuery
} from './palette.schema'

export type { DesignPalette, DesignPaletteData, DesignPalettePatch, DesignPaletteQuery }

export interface DesignPaletteParams extends MongoDBAdapterParams<DesignPaletteQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class DesignPaletteService<ServiceParams extends Params = DesignPaletteParams> extends MongoDBService<
  DesignPalette,
  DesignPaletteData,
  DesignPaletteParams,
  DesignPalettePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient')
      .then((db) => db.collection('design-palette'))
      .then((collection) => {
        collection.createIndex({ designSystemId: 1 })

        return collection
      })
  }
}
