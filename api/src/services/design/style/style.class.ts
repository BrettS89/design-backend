// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type { DesignStyle, DesignStyleData, DesignStylePatch, DesignStyleQuery } from './style.schema'

export type { DesignStyle, DesignStyleData, DesignStylePatch, DesignStyleQuery }

export interface DesignStyleParams extends MongoDBAdapterParams<DesignStyleQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class DesignStyleService<ServiceParams extends Params = DesignStyleParams> extends MongoDBService<
  DesignStyle,
  DesignStyleData,
  DesignStyleParams,
  DesignStylePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient')
      .then((db) => db.collection('design-style'))
      .then((collection) => {
        collection.createIndex({ designSystemId: 1 })

        return collection
      })
  }
}
