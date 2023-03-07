// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  SecurityUser,
  SecurityUserData,
  SecurityUserPatch,
  SecurityUserQuery,
  SecurityUserService
} from './user.class'

export type { SecurityUser, SecurityUserData, SecurityUserPatch, SecurityUserQuery }

export type SecurityUserClientService = Pick<
  SecurityUserService<Params<SecurityUserQuery>>,
  (typeof securityUserMethods)[number]
>

export const securityUserPath = 'security/user'

export const securityUserMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const securityUserClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(securityUserPath, connection.service(securityUserPath), {
    methods: securityUserMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [securityUserPath]: SecurityUserClientService
  }
}
