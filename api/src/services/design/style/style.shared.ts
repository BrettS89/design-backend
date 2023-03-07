// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  DesignStyle,
  DesignStyleData,
  DesignStylePatch,
  DesignStyleQuery,
  DesignStyleService
} from './style.class'

export type { DesignStyle, DesignStyleData, DesignStylePatch, DesignStyleQuery }

export type DesignStyleClientService = Pick<
  DesignStyleService<Params<DesignStyleQuery>>,
  (typeof designStyleMethods)[number]
>

export const designStylePath = 'design/style'

export const designStyleMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const designStyleClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(designStylePath, connection.service(designStylePath), {
    methods: designStyleMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [designStylePath]: DesignStyleClientService
  }
}
