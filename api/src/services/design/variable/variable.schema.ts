// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'

// Main data model schema
export const designVariableSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    accountId: ObjectIdSchema(),
    designSystemId: ObjectIdSchema(),
    key: Type.String(),
    value: Type.String()
  },
  { $id: 'DesignVariable', additionalProperties: false }
)
export type DesignVariable = Static<typeof designVariableSchema>
export const designVariableValidator = getValidator(designVariableSchema, dataValidator)
export const designVariableResolver = resolve<DesignVariable, HookContext>({})

export const designVariableExternalResolver = resolve<DesignVariable, HookContext>({})

// Schema for creating new entries
export const designVariableDataSchema = Type.Pick(designVariableSchema, ['key', 'value'], {
  $id: 'DesignVariableData'
})
export type DesignVariableData = Static<typeof designVariableDataSchema>
export const designVariableDataValidator = getValidator(designVariableDataSchema, dataValidator)
export const designVariableDataResolver = resolve<DesignVariable, HookContext>({})

// Schema for updating existing entries
export const designVariablePatchSchema = Type.Partial(designVariableSchema, {
  $id: 'DesignVariablePatch'
})
export type DesignVariablePatch = Static<typeof designVariablePatchSchema>
export const designVariablePatchValidator = getValidator(designVariablePatchSchema, dataValidator)
export const designVariablePatchResolver = resolve<DesignVariable, HookContext>({})

// Schema for allowed query properties
export const designVariableQueryProperties = Type.Pick(designVariableSchema, ['_id', 'key'])
export const designVariableQuerySchema = Type.Intersect(
  [
    querySyntax(designVariableQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DesignVariableQuery = Static<typeof designVariableQuerySchema>
export const designVariableQueryValidator = getValidator(designVariableQuerySchema, queryValidator)
export const designVariableQueryResolver = resolve<DesignVariableQuery, HookContext>({})
