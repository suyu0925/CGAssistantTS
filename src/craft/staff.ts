import * as _ from 'lodash'
import { cga } from '../cga'
import * as move from '../move'
import * as npc from '../npc'
import { waitWorkingResult } from '../player'
import { supplyHpMp } from '../supply/hpmp'
import { log } from '../utils'

const StaffCrafts = [
  {
    level: 1, craftIndex: 0, name: '短杖', meterials: [
      { name: '铜条', count: 4 },
      { name: '印度轻木', count: 20 },
    ], mana: 20, sellPrice: 220,
  },
  {
    level: 1, craftIndex: 1, name: '权杖', meterials: [
      { name: '铜条', count: 6 },
      { name: '铁条', count: 2 },
      { name: '印度轻木', count: 20 },
    ], mana: 20, sellPrice: 350,
  },
]

const sellStaffs = async (name: string) => {
  if (cga.getItemCount(name) === 0) {
    log(`没有${name}要卖`)
    return
  }
  await move.falan.toStone('S')
  await npc.talkToNpc('平民防具贩售处', npc.DefaultDialogStrategies.SecondOnce)
  const soldItems = cga.getInventoryItems()
    .filter(item => item.name === name)
    .map(item => ({ itempos: item.pos, itemid: item.itemid, count: Math.max(item.count, 1) }))
  cga.SellNPCStore(soldItems)

  while (cga.getItemCount(name)) {
    await cga.delay(1000)
  }
  log(`卖完${name}啦`)
}

const craftStaff = async (level?: number) => {
  const skill = cga.findPlayerSkill('造杖')
  level = level ?? skill.lv
  const craftIndex = 0
  const craft = StaffCrafts.find(craft => craft.craftIndex === craftIndex)

  while (true) {
    if (cga.GetPlayerInfo().mp < craft.mana) {
      await supplyHpMp()
      if (cga.GetPlayerInfo().mp < craft.mana) {
        log(`魔力不足，停止造杖`)
        break
      }
    }

    if (cga.getInventoryItems().length >= 20) {
      await sellStaffs(craft.name)
      if (cga.getInventoryItems().length >= 20) {
        log(`背包已满，停止造杖`)
        break
      }
    }

    if (cga.StartWork(skill.index, craftIndex)) {
      const items = craft.meterials.map(meterial => cga.getInventoryItems().find(item => item.name === meterial.name && item.count >= meterial.count))
      if (_.every(items, item => !!item)) {
        if (cga.CraftItem(skill.index, craftIndex, 0, items.map(item => item.pos))) {
          const result = await waitWorkingResult(2000)
        } else {
          throw new Error(`制造出错`)
        }
      } else {
        log(`材料用完，停止造杖`)
        break
      }
    } else {
      throw new Error(`未能成功使用${skill.lv}级制弓技能制造${craft.name}`)
    }
  }
}

export {
  craftStaff,
}

