// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  DesignSystem,
  DesignSystemData,
  DesignSystemPatch,
  DesignSystemQuery,
  DesignSystemService
} from './system.class'

export type { DesignSystem, DesignSystemData, DesignSystemPatch, DesignSystemQuery }

export type DesignSystemClientService = Pick<
  DesignSystemService<Params<DesignSystemQuery>>,
  (typeof designSystemMethods)[number]
>

export const designSystemPath = 'design/system'

export const designSystemMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const designSystemClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(designSystemPath, connection.service(designSystemPath), {
    methods: designSystemMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [designSystemPath]: DesignSystemClientService
  }
}
