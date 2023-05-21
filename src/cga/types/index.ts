import { IConfigApi } from './config'
import { IDialogApi } from './dialog'
import { IGuiApi } from './gui'
import { IMapApi } from './map'
import { IMoveApi } from './move'
import { INpcApi } from './npc'
import { IPlayerApi } from './player'
import { IRequestApi } from './request'
import { ITeamApi } from './team'
import { ITravelApi } from './travel'

export * from './map'
export * from './move'
export * from './npc'
export * from './request'
export * from './travel'

export interface ICgaApi extends
  ITravelApi,
  IMapApi,
  IGuiApi,
  IPlayerApi,
  IDialogApi,
  INpcApi,
  IConfigApi,
  ITeamApi,
  IMoveApi,
  IRequestApi {
  delay: (ms: number) => Promise<void>
}
