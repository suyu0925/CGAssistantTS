import { loadAutoBattleSettings } from '../battle/settings'
import { loadGatheringItemWeakListSettings, loadGatheringSettings } from '../gather'
import { ItemWeakListSettings } from '../item'
import { AutoSupplyOnTheRoadSettings } from '../supply'
import { loadSettings } from '../utils'
import { ICgaApi } from './types'

export * from './types'

export let cga: ICgaApi

const loadBaseSettings = async () => {
  // 开启说话防掉线
  await loadSettings({ player: { antiafkkick: true, } })
  // 物品堆叠
  await loadSettings(ItemWeakListSettings)
  await loadGatheringItemWeakListSettings()
  // 缩短采集所需时间
  await loadGatheringSettings()
  // 自动战斗
  await loadAutoBattleSettings()
  // 自动补给
  await loadSettings(AutoSupplyOnTheRoadSettings)
  // 快速完成工作
  cga.SetImmediateDoneWork(true)
}

export const bootstrap = async (): Promise<ICgaApi> => {
  await new Promise(resolve => {
    const _cga: ICgaApi = require(process.env.CGA_DIR_PATH_UTF8 + '/cgaapi')(() => {
      cga = _cga
      resolve(cga)
    })
  })
  await loadBaseSettings()
  return cga
}
