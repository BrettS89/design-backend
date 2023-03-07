// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  SecurityTeam,
  SecurityTeamData,
  SecurityTeamPatch,
  SecurityTeamQuery,
  SecurityTeamService
} from './team.class'

export type { SecurityTeam, SecurityTeamData, SecurityTeamPatch, SecurityTeamQuery }

export type SecurityTeamClientService = Pick<
  SecurityTeamService<Params<SecurityTeamQuery>>,
  (typeof securityTeamMethods)[number]
>

export const securityTeamPath = 'security/team'

export const securityTeamMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const securityTeamClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(securityTeamPath, connection.service(securityTeamPath), {
    methods: securityTeamMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [securityTeamPath]: SecurityTeamClientService
  }
}
