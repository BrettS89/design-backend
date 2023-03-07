// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'

// Main data model schema
export const securityAccountSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String()
  },
  { $id: 'SecurityAccount', additionalProperties: false }
)
export type SecurityAccount = Static<typeof securityAccountSchema>
export const securityAccountValidator = getValidator(securityAccountSchema, dataValidator)
export const securityAccountResolver = resolve<SecurityAccount, HookContext>({
  
})

export const securityAccountExternalResolver = resolve<SecurityAccount, HookContext>({})

// Schema for creating new entries
export const securityAccountDataSchema = Type.Pick(securityAccountSchema, ['name'], {
  $id: 'SecurityAccountData'
})
export type SecurityAccountData = Static<typeof securityAccountDataSchema>
export const securityAccountDataValidator = getValidator(securityAccountDataSchema, dataValidator)
export const securityAccountDataResolver = resolve<SecurityAccount, HookContext>({})

// Schema for updating existing entries
export const securityAccountPatchSchema = Type.Partial(securityAccountSchema, {
  $id: 'SecurityAccountPatch'
})
export type SecurityAccountPatch = Static<typeof securityAccountPatchSchema>
export const securityAccountPatchValidator = getValidator(securityAccountPatchSchema, dataValidator)
export const securityAccountPatchResolver = resolve<SecurityAccount, HookContext>({})

// Schema for allowed query properties
export const securityAccountQueryProperties = Type.Pick(securityAccountSchema, ['_id', 'name'])
export const securityAccountQuerySchema = Type.Intersect(
  [
    querySyntax(securityAccountQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecurityAccountQuery = Static<typeof securityAccountQuerySchema>
export const securityAccountQueryValidator = getValidator(securityAccountQuerySchema, queryValidator)
export const securityAccountQueryResolver = resolve<SecurityAccountQuery, HookContext>({})
