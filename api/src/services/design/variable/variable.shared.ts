// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../../client'
import type {
  DesignVariable,
  DesignVariableData,
  DesignVariablePatch,
  DesignVariableQuery,
  DesignVariableService
} from './variable.class'

export type { DesignVariable, DesignVariableData, DesignVariablePatch, DesignVariableQuery }

export type DesignVariableClientService = Pick<
  DesignVariableService<Params<DesignVariableQuery>>,
  (typeof designVariableMethods)[number]
>

export const designVariablePath = 'design/variable'

export const designVariableMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const designVariableClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(designVariablePath, connection.service(designVariablePath), {
    methods: designVariableMethods
  })
}

// Add this service to the client service type index
declare module '../../../client' {
  interface ServiceTypes {
    [designVariablePath]: DesignVariableClientService
  }
}
