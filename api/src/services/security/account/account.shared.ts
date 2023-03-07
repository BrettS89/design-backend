// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  SecurityAccount,
  SecurityAccountData,
  SecurityAccountPatch,
  SecurityAccountQuery,
  SecurityAccountService
} from './account.class'

export type { SecurityAccount, SecurityAccountData, SecurityAccountPatch, SecurityAccountQuery }

export type SecurityAccountClientService = Pick<
  SecurityAccountService<Params<SecurityAccountQuery>>,
  (typeof securityAccountMethods)[number]
>

export const securityAccountPath = 'security/account'

export const securityAccountMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const securityAccountClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(securityAccountPath, connection.service(securityAccountPath), {
    methods: securityAccountMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [securityAccountPath]: SecurityAccountClientService
  }
}
