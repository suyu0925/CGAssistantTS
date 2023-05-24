import { IConfigApi } from './config'
import { IDialogApi } from './dialog'
import { IGuiApi } from './gui'
import { IItemApi } from './item'
import { IMapApi } from './map'
import { IMoveApi } from './move'
import { INpcApi } from './npc'
import { IPetApi } from './pet'
import { IPlayerApi } from './player'
import { ISystemApi } from './system'
import { ITeamApi } from './team'
import { ITravelApi } from './travel'

export * from './config'
export * from './dialog'
export * from './gui'
export * from './item'
export * from './map'
export * from './move'
export * from './npc'
export * from './pet'
export * from './player'
export * from './system'
export * from './team'
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
  ISystemApi,
  IPetApi,
  IItemApi {
  delay: (ms: number) => Promise<void>
}
