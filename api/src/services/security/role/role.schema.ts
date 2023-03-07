// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'

// Main data model schema
export const securityRoleSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String()
  },
  { $id: 'SecurityRole', additionalProperties: false }
)
export type SecurityRole = Static<typeof securityRoleSchema>
export const securityRoleValidator = getValidator(securityRoleSchema, dataValidator)
export const securityRoleResolver = resolve<SecurityRole, HookContext>({})

export const securityRoleExternalResolver = resolve<SecurityRole, HookContext>({})

// Schema for creating new entries
export const securityRoleDataSchema = Type.Pick(securityRoleSchema, ['name'], {
  $id: 'SecurityRoleData'
})
export type SecurityRoleData = Static<typeof securityRoleDataSchema>
export const securityRoleDataValidator = getValidator(securityRoleDataSchema, dataValidator)
export const securityRoleDataResolver = resolve<SecurityRole, HookContext>({})

// Schema for updating existing entries
export const securityRolePatchSchema = Type.Partial(securityRoleSchema, {
  $id: 'SecurityRolePatch'
})
export type SecurityRolePatch = Static<typeof securityRolePatchSchema>
export const securityRolePatchValidator = getValidator(securityRolePatchSchema, dataValidator)
export const securityRolePatchResolver = resolve<SecurityRole, HookContext>({})

// Schema for allowed query properties
export const securityRoleQueryProperties = Type.Pick(securityRoleSchema, ['_id', 'name'])
export const securityRoleQuerySchema = Type.Intersect(
  [
    querySyntax(securityRoleQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecurityRoleQuery = Static<typeof securityRoleQuerySchema>
export const securityRoleQueryValidator = getValidator(securityRoleQuerySchema, queryValidator)
export const securityRoleQueryResolver = resolve<SecurityRoleQuery, HookContext>({})
