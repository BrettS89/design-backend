// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'
import { securityAccountSchema } from '../account/account.schema'
import { securityRoleSchema } from '../role/role.schema'
import { AdapterId } from '@feathersjs/mongodb'

// Main data model schema
export const securityUserSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    email: Type.String(),
    password: Type.String(),
    accountId: ObjectIdSchema(),
    roleId: ObjectIdSchema(),
    teamId: Type.Optional(ObjectIdSchema()),
    account: Type.Optional(Type.Ref(securityAccountSchema)),
    role: Type.Optional(Type.Ref(securityRoleSchema)),
  },
  { $id: 'SecurityUser', additionalProperties: false }
)
export type SecurityUser = Static<typeof securityUserSchema>
export const securityUserValidator = getValidator(securityUserSchema, dataValidator)
export const securityUserResolver = resolve<SecurityUser, HookContext>({
  account: virtual(async (user, context) => {
    return context.app.service('security/account').get(user.accountId as AdapterId)
  }),
  role: virtual(async (user, context) => {
    return context.app.service('security/role').get(user.roleId as AdapterId)
  }),
})

export const securityUserExternalResolver = resolve<SecurityUser, HookContext>({})

// Schema for creating new entries
export const securityUserDataSchema = Type.Pick(securityUserSchema, ['email', 'password', 'accountId'], {
  $id: 'SecurityUserData'
})
export type SecurityUserData = Static<typeof securityUserDataSchema>
export const securityUserDataValidator = getValidator(securityUserDataSchema, dataValidator)
export const securityUserDataResolver = resolve<SecurityUser, HookContext>({})

// Schema for updating existing entries
export const securityUserPatchSchema = Type.Partial(securityUserSchema, {
  $id: 'SecurityUserPatch'
})
export type SecurityUserPatch = Static<typeof securityUserPatchSchema>
export const securityUserPatchValidator = getValidator(securityUserPatchSchema, dataValidator)
export const securityUserPatchResolver = resolve<SecurityUser, HookContext>({})

// Schema for allowed query properties
export const securityUserQueryProperties = Type.Pick(securityUserSchema, ['_id', 'email', 'accountId'])
export const securityUserQuerySchema = Type.Intersect(
  [
    querySyntax(securityUserQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecurityUserQuery = Static<typeof securityUserQuerySchema>
export const securityUserQueryValidator = getValidator(securityUserQuerySchema, queryValidator)
export const securityUserQueryResolver = resolve<SecurityUserQuery, HookContext>({})
