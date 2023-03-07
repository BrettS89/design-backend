// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  SecurityRole,
  SecurityRoleData,
  SecurityRolePatch,
  SecurityRoleQuery,
  SecurityRoleService
} from './role.class'

export type { SecurityRole, SecurityRoleData, SecurityRolePatch, SecurityRoleQuery }

export type SecurityRoleClientService = Pick<
  SecurityRoleService<Params<SecurityRoleQuery>>,
  (typeof securityRoleMethods)[number]
>

export const securityRolePath = 'security/role'

export const securityRoleMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const securityRoleClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(securityRolePath, connection.service(securityRolePath), {
    methods: securityRoleMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [securityRolePath]: SecurityRoleClientService
  }
}
