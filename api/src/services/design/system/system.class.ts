// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type { DesignSystem, DesignSystemData, DesignSystemPatch, DesignSystemQuery } from './system.schema'

export type { DesignSystem, DesignSystemData, DesignSystemPatch, DesignSystemQuery }

export interface DesignSystemParams extends MongoDBAdapterParams<DesignSystemQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class DesignSystemService<ServiceParams extends Params = DesignSystemParams> extends MongoDBService<
  DesignSystem,
  DesignSystemData,
  DesignSystemParams,
  DesignSystemPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient')
      .then((db) => db.collection('design-system'))
      .then((collection) => {
        collection.createIndex({ teamId: 1 })

        return collection
      })
  }
}
