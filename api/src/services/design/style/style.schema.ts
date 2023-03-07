// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'

// Main data model schema
export const designStyleSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    designSystemId: ObjectIdSchema(),
    component: Type.String(),
    styles: Type.Array(
      Type.Object({
        variant: Type.String(),
      }),
    ),
  },
  { $id: 'DesignStyle', additionalProperties: false }
)
export type DesignStyle = Static<typeof designStyleSchema>
export const designStyleValidator = getValidator(designStyleSchema, dataValidator)
export const designStyleResolver = resolve<DesignStyle, HookContext>({})

export const designStyleExternalResolver = resolve<DesignStyle, HookContext>({})

// Schema for creating new entries
export const designStyleDataSchema = Type.Pick(designStyleSchema, ['component', 'styles'], {
  $id: 'DesignStyleData'
})
export type DesignStyleData = Static<typeof designStyleDataSchema>
export const designStyleDataValidator = getValidator(designStyleDataSchema, dataValidator)
export const designStyleDataResolver = resolve<DesignStyle, HookContext>({})

// Schema for updating existing entries
export const designStylePatchSchema = Type.Partial(designStyleSchema, {
  $id: 'DesignStylePatch'
})
export type DesignStylePatch = Static<typeof designStylePatchSchema>
export const designStylePatchValidator = getValidator(designStylePatchSchema, dataValidator)
export const designStylePatchResolver = resolve<DesignStyle, HookContext>({})

// Schema for allowed query properties
export const designStyleQueryProperties = Type.Pick(designStyleSchema, ['_id', 'component'])
export const designStyleQuerySchema = Type.Intersect(
  [
    querySyntax(designStyleQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DesignStyleQuery = Static<typeof designStyleQuerySchema>
export const designStyleQueryValidator = getValidator(designStyleQuerySchema, queryValidator)
export const designStyleQueryResolver = resolve<DesignStyleQuery, HookContext>({})
