// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../../declarations'
import { dataValidator, queryValidator } from '../../../validators'

// Main data model schema
export const designPaletteSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    accountId: ObjectIdSchema(),
    name: Type.String(),
    colors: Type.Array(
      Type.Object({
        key: Type.String(),
        value: Type.String(),
      }),
    ),
  },
  { $id: 'DesignPalette', additionalProperties: false }
)
export type DesignPalette = Static<typeof designPaletteSchema>
export const designPaletteValidator = getValidator(designPaletteSchema, dataValidator)
export const designPaletteResolver = resolve<DesignPalette, HookContext>({})

export const designPaletteExternalResolver = resolve<DesignPalette, HookContext>({})

// Schema for creating new entries
export const designPaletteDataSchema = Type.Pick(designPaletteSchema, ['accountId', 'colors'], {
  $id: 'DesignPaletteData'
})
export type DesignPaletteData = Static<typeof designPaletteDataSchema>
export const designPaletteDataValidator = getValidator(designPaletteDataSchema, dataValidator)
export const designPaletteDataResolver = resolve<DesignPalette, HookContext>({})

// Schema for updating existing entries
export const designPalettePatchSchema = Type.Partial(designPaletteSchema, {
  $id: 'DesignPalettePatch'
})
export type DesignPalettePatch = Static<typeof designPalettePatchSchema>
export const designPalettePatchValidator = getValidator(designPalettePatchSchema, dataValidator)
export const designPalettePatchResolver = resolve<DesignPalette, HookContext>({})

// Schema for allowed query properties
export const designPaletteQueryProperties = Type.Pick(designPaletteSchema, ['_id', 'accountId'])
export const designPaletteQuerySchema = Type.Intersect(
  [
    querySyntax(designPaletteQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type DesignPaletteQuery = Static<typeof designPaletteQuerySchema>
export const designPaletteQueryValidator = getValidator(designPaletteQuerySchema, queryValidator)
export const designPaletteQueryResolver = resolve<DesignPaletteQuery, HookContext>({})
