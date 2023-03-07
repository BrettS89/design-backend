// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'

// Main data model schema
export const designSystemSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    accountId: ObjectIdSchema(),
    teamId: ObjectIdSchema(),
    name: Type.String(),
  },
  { $id: 'DesignSystem', additionalProperties: false }
)
export type DesignSystem = Static<typeof designSystemSchema>
export const designSystemValidator = getValidator(designSystemSchema, dataValidator)
export const designSystemResolver = resolve<DesignSystem, HookContext>({})

export const designSystemExternalResolver = resolve<DesignSystem, HookContext>({})

// Schema for creating new entries
export const designSystemDataSchema = Type.Pick(designSystemSchema, ['name', 'accountId'], {
  $id: 'DesignSystemData'
})
export type DesignSystemData = Static<typeof designSystemDataSchema>
export const designSystemDataValidator = getValidator(designSystemDataSchema, dataValidator)
export const designSystemDataResolver = resolve<DesignSystem, HookContext>({})

// Schema for updating existing entries
export const designSystemPatchSchema = Type.Partial(designSystemSchema, {
  $id: 'DesignSystemPatch'
})
export type DesignSystemPatch = Static<typeof designSystemPatchSchema>
export const designSystemPatchValidator = getValidator(designSystemPatchSchema, dataValidator)
export const designSystemPatchResolver = resolve<DesignSystem, HookContext>({})

// Schema for allowed query properties
export const designSystemQueryProperties = Type.Pick(designSystemSchema, ['_id', 'name', 'accountId'])
export const designSystemQuerySchema = Type.Intersect(
  [
    querySyntax(designSystemQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DesignSystemQuery = Static<typeof designSystemQuerySchema>
export const designSystemQueryValidator = getValidator(designSystemQuerySchema, queryValidator)
export const designSystemQueryResolver = resolve<DesignSystemQuery, HookContext>({})
