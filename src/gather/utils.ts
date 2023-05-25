import { HealthStatus, cga } from '../cga'
import * as item from '../item'
import { cureByself } from '../supply/injury'
import { getSettings, loadSettings, log } from '../utils'
import * as farm from '../farm'
import { ItemType, Items } from '../database/item'

const waitForBagFullSafely = async (gathering: '伐木' | '挖矿' | '狩猎') => {
  while (true) {
    if (cga.GetPlayerInfo().health !== HealthStatus.Normal) {
      if (!await cureByself()) {
        log(`受伤治不好了，回城吧！`)
        break
      } else {
        log(`治疗成功，继续伐木`)
        const skill = cga.findPlayerSkill(gathering)
        cga.StartWork(skill.index, 0)
        log(`继续伐木中...`)
      }
    }

    if (item.isBagFull() || cga.GetPlayerInfo().mp <= 10) {
      log(`没魔了，回城吧！`)
      break
    }

    await cga.delay(1000)
  }
}

const prepare = async () => {
  await farm.prepare()
}

const loadGatheringSettings = async () => {
  await loadSettings({
    player: {
      workdelay: 5500, // 建议值5100~5500，再低了容易掉线。
    }
  })
}

const loadGatheringItemWeakListSettings = async () => {
  const allGatheringItems = Items.filter(item => item.type === ItemType.Wood || item.type === ItemType.Vanilla)
  const gatheringItemWeakList = allGatheringItems.map(item => `${item.name}|${item.maxStackCount}`)
  const { itemtweaklist } = await getSettings()
  await loadSettings({
    itemtweaklist: Array.from(new Set(itemtweaklist.concat(gatheringItemWeakList))),
  })
}

export {
  waitForBagFullSafely,
  prepare,
  loadGatheringSettings,
  loadGatheringItemWeakListSettings,
}

