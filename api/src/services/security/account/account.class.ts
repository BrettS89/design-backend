// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type {
  SecurityAccount,
  SecurityAccountData,
  SecurityAccountPatch,
  SecurityAccountQuery
} from './account.schema'

export type { SecurityAccount, SecurityAccountData, SecurityAccountPatch, SecurityAccountQuery }

export interface SecurityAccountParams extends MongoDBAdapterParams<SecurityAccountQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SecurityAccountService<
  ServiceParams extends Params = SecurityAccountParams
> extends MongoDBService<SecurityAccount, SecurityAccountData, SecurityAccountParams, SecurityAccountPatch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('security-account'))
  }
}
