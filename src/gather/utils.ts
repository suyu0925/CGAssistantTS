import { HealthStatus, cga } from '../cga'
import { ItemType, Items } from '../database/item'
import * as farm from '../farm'
import * as item from '../item'
import { getPlayerProfession } from '../player/profession'
import { supplyHpMp } from '../supply/hpmp'
import { cureByself } from '../supply/injury'
import { getSettings, loadSettings, log } from '../utils'

const waitForBagFullSafely = async (gathering: '伐木' | '挖掘' | '狩猎') => {
  while (true) {
    if (cga.GetPlayerInfo().health !== HealthStatus.Normal) {
      if (!await cureByself()) {
        log(`受伤治不好了，回城吧！`)
        break
      } else {
        log(`治疗成功，继续${gathering}`)
        // TODO: 还是有时候不能恢复采集，加个延时吧
        await cga.delay(1000)
        const skill = cga.findPlayerSkill(gathering)
        cga.StartWork(skill.index, 0)
        log(`继续${gathering}中...`)
      }
    }

    if (item.isBagFull()) {
      log(`包满了，回城吧！`)
      break
    }

    if (cga.GetPlayerInfo().mp <= 5) {
      log(`没魔了，回城吧！`)
      break
    }

    await cga.delay(1000)
  }
}

const prepare = async () => {
  if (getPlayerProfession().category !== '采集系') {
    log('当前职业不是采集系，无法使用采集功能')
    return
  }

  await farm.prepare()
  // 补完魔如果受轻伤自己治一下，治完再次补魔
  await cureByself()
  await supplyHpMp()
}

const loadGatheringSettings = async () => {
  await loadSettings({
    player: {
      workdelay: 5500, // 建议值5100~5500，再低了容易掉线。
    }
  })
}

const loadGatheringItemWeakListSettings = async () => {
  const allGatheringItems = Items.filter(item =>
    item.type === ItemType.Wood
    || item.type === ItemType.Vanilla
    || item.type === ItemType.Mine
    || item.type === ItemType.FoodMeterial
    || item.type === ItemType.Fruit
  )
  const gatheringItemWeakList = allGatheringItems.map(item => `${item.name}|${item.maxStackCount}`)
  const { itemtweaklist } = await getSettings()
  await loadSettings({
    itemtweaklist: Array.from(new Set(itemtweaklist.concat(gatheringItemWeakList))),
  })
}

const dropLowPriceItems = async () => {
  const items = cga
    .getInventoryItems()
    .filter(item => item.name === '卡片？') // 不要未鉴定的卡片
  items.forEach(item => cga.DropItem(item.pos))
}

export {
  waitForBagFullSafely,
  prepare,
  loadGatheringSettings,
  loadGatheringItemWeakListSettings,
  dropLowPriceItems,
}

