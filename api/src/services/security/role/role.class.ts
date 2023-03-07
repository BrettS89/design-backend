// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type { SecurityRole, SecurityRoleData, SecurityRolePatch, SecurityRoleQuery } from './role.schema'

export type { SecurityRole, SecurityRoleData, SecurityRolePatch, SecurityRoleQuery }

export interface SecurityRoleParams extends MongoDBAdapterParams<SecurityRoleQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SecurityRoleService<ServiceParams extends Params = SecurityRoleParams> extends MongoDBService<
  SecurityRole,
  SecurityRoleData,
  SecurityRoleParams,
  SecurityRolePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('security-role'))
  }
}
