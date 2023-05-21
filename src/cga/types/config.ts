import { MapName } from './map'

export type PlayerConfig = {
  settledCity: MapName // 定居点
}

export interface IConfigApi {
  loadPlayerConfig: () => PlayerConfig
}
