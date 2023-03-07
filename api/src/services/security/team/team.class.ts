// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type { SecurityTeam, SecurityTeamData, SecurityTeamPatch, SecurityTeamQuery } from './team.schema'

export type { SecurityTeam, SecurityTeamData, SecurityTeamPatch, SecurityTeamQuery }

export interface SecurityTeamParams extends MongoDBAdapterParams<SecurityTeamQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SecurityTeamService<ServiceParams extends Params = SecurityTeamParams> extends MongoDBService<
  SecurityTeam,
  SecurityTeamData,
  SecurityTeamParams,
  SecurityTeamPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('security-team'))
  }
}
