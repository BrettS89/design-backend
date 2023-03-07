// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  DesignPalette,
  DesignPaletteData,
  DesignPalettePatch,
  DesignPaletteQuery,
  DesignPaletteService
} from './palette.class'

export type { DesignPalette, DesignPaletteData, DesignPalettePatch, DesignPaletteQuery }

export type DesignPaletteClientService = Pick<
  DesignPaletteService<Params<DesignPaletteQuery>>,
  (typeof designPaletteMethods)[number]
>

export const designPalettePath = 'design/palette'

export const designPaletteMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const designPaletteClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(designPalettePath, connection.service(designPalettePath), {
    methods: designPaletteMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [designPalettePath]: DesignPaletteClientService
  }
}
