// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'

// Main data model schema
export const securityTeamSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    accountId: ObjectIdSchema(),
    name: Type.String(),
  },
  { $id: 'SecurityTeam', additionalProperties: false }
)
export type SecurityTeam = Static<typeof securityTeamSchema>
export const securityTeamValidator = getValidator(securityTeamSchema, dataValidator)
export const securityTeamResolver = resolve<SecurityTeam, HookContext>({})

export const securityTeamExternalResolver = resolve<SecurityTeam, HookContext>({})

// Schema for creating new entries
export const securityTeamDataSchema = Type.Pick(securityTeamSchema, ['accountId'], {
  $id: 'SecurityTeamData'
})
export type SecurityTeamData = Static<typeof securityTeamDataSchema>
export const securityTeamDataValidator = getValidator(securityTeamDataSchema, dataValidator)
export const securityTeamDataResolver = resolve<SecurityTeam, HookContext>({})

// Schema for updating existing entries
export const securityTeamPatchSchema = Type.Partial(securityTeamSchema, {
  $id: 'SecurityTeamPatch'
})
export type SecurityTeamPatch = Static<typeof securityTeamPatchSchema>
export const securityTeamPatchValidator = getValidator(securityTeamPatchSchema, dataValidator)
export const securityTeamPatchResolver = resolve<SecurityTeam, HookContext>({})

// Schema for allowed query properties
export const securityTeamQueryProperties = Type.Pick(securityTeamSchema, ['_id', 'accountId'])
export const securityTeamQuerySchema = Type.Intersect(
  [
    querySyntax(securityTeamQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecurityTeamQuery = Static<typeof securityTeamQuerySchema>
export const securityTeamQueryValidator = getValidator(securityTeamQuerySchema, queryValidator)
export const securityTeamQueryResolver = resolve<SecurityTeamQuery, HookContext>({})
