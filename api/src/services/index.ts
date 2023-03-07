import { securityTeam } from './security/team/team'
import { designPalette } from './design/palette/palette'
import { designVariable } from './design/variable/variable'
import { designSystem } from './design/system/system'
import { designStyle } from './design/style/style'
import { securityRole } from './security/role/role'
import { securityUser } from './security/user/user'
import { securityAccount } from './security/account/account'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(securityTeam)
  app.configure(designPalette)
  app.configure(designVariable)
  app.configure(designSystem)
  app.configure(designStyle)
  app.configure(securityRole)
  app.configure(securityUser)
  app.configure(securityAccount)
  // All services will be registered here
}
