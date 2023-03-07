// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type { SecurityUser, SecurityUserData, SecurityUserPatch, SecurityUserQuery } from './user.schema'

export type { SecurityUser, SecurityUserData, SecurityUserPatch, SecurityUserQuery }

export interface SecurityUserParams extends MongoDBAdapterParams<SecurityUserQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SecurityUserService<ServiceParams extends Params = SecurityUserParams> extends MongoDBService<
  SecurityUser,
  SecurityUserData,
  SecurityUserParams,
  SecurityUserPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('security-user'))
  }
}
