// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { securityTeamClient } from './services/security/team/team.shared'
export type {
  SecurityTeam,
  SecurityTeamData,
  SecurityTeamQuery,
  SecurityTeamPatch
} from './services/security/team/team.shared'

import { designPaletteClient } from './services/design/palette/palette.shared'
export type {
  DesignPalette,
  DesignPaletteData,
  DesignPaletteQuery,
  DesignPalettePatch
} from './services/design/palette/palette.shared'

import { designVariableClient } from './services/design/variable/variable.shared'
export type {
  DesignVariable,
  DesignVariableData,
  DesignVariableQuery,
  DesignVariablePatch
} from './services/design/variable/variable.shared'

import { designSystemClient } from './services/design/system/system.shared'
export type {
  DesignSystem,
  DesignSystemData,
  DesignSystemQuery,
  DesignSystemPatch
} from './services/design/system/system.shared'

import { designStyleClient } from './services/design/style/style.shared'
export type {
  DesignStyle,
  DesignStyleData,
  DesignStyleQuery,
  DesignStylePatch
} from './services/design/style/style.shared'

import { securityRoleClient } from './services/security/role/role.shared'
export type {
  SecurityRole,
  SecurityRoleData,
  SecurityRoleQuery,
  SecurityRolePatch
} from './services/security/role/role.shared'

import { securityUserClient } from './services/security/user/user.shared'
export type {
  SecurityUser,
  SecurityUserData,
  SecurityUserQuery,
  SecurityUserPatch
} from './services/security/user/user.shared'

import { securityAccountClient } from './services/security/account/account.shared'
export type {
  SecurityAccount,
  SecurityAccountData,
  SecurityAccountQuery,
  SecurityAccountPatch
} from './services/security/account/account.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(securityAccountClient)
  client.configure(securityUserClient)
  client.configure(securityRoleClient)
  client.configure(designStyleClient)
  client.configure(designSystemClient)
  client.configure(designVariableClient)
  client.configure(designPaletteClient)
  client.configure(securityTeamClient)
  return client
}
