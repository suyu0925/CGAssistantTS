import { loadAutoBattleSettings } from '../battle/settings'
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
  // 自动战斗
  await loadAutoBattleSettings()
  // 自动补给
  await loadSettings(AutoSupplyOnTheRoadSettings)
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
