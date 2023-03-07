// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type {
  DesignVariable,
  DesignVariableData,
  DesignVariablePatch,
  DesignVariableQuery
} from './variable.schema'

export type { DesignVariable, DesignVariableData, DesignVariablePatch, DesignVariableQuery }

export interface DesignVariableParams extends MongoDBAdapterParams<DesignVariableQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class DesignVariableService<
  ServiceParams extends Params = DesignVariableParams
> extends MongoDBService<DesignVariable, DesignVariableData, DesignVariableParams, DesignVariablePatch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient')
      .then((db) => db.collection('design-variable'))
      .then((collection) => {
        collection.createIndex({ designSystemId: 1 })

        return collection
      })
  }
}
