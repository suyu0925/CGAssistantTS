import * as _ from 'lodash'
import { cga } from '../cga'
import * as move from '../move'
import * as npc from '../npc'
import { waitWorkingResult } from '../player'
import { supplyHpMp } from '../supply/hpmp'
import { log } from '../utils'
import { buyMaterial } from './buy'

const BowCrafts = [
  {
    level: 1, craftIndex: 0, name: '轻型弓', meterials: [
      { name: '铜条', count: 3 },
      { name: '印度轻木', count: 20 },
      { name: '麻布', count: 1 },
    ], mana: 20, sellPrice: 220,
  },
  {
    level: 1, craftIndex: 1, name: '威力短弓', meterials: [
      { name: '铜条', count: 2 },
      { name: '印度轻木', count: 20 },
      { name: '枞', count: 20 },
      { name: '麻布', count: 3 },
      { name: '木棉布', count: 2 },
    ], mana: 20, sellPrice: 350,
  },
]

const sellBows = async (name: string) => {
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

const craftBow = async (level?: number) => {
  const skill = cga.findPlayerSkill('造弓')
  level = level ?? skill.lv
  const craftIndex = 0
  const craft = BowCrafts.find(craft => craft.craftIndex === craftIndex)

  cga.SetImmediateDoneWork(true)

  // await buyMaterial('麻布', 40)

  while (true) {
    if (cga.GetPlayerInfo().mp < craft.mana) {
      await supplyHpMp()
      if (cga.GetPlayerInfo().mp < craft.mana) {
        log(`魔力不足，停止制弓`)
        break
      }
    }

    if (cga.getInventoryItems().length >= 20) {
      await sellBows(craft.name)
      if (cga.getInventoryItems().length >= 20) {
        log(`背包已满，停止制弓`)
        break
      }
    }

    if (cga.StartWork(skill.index, craftIndex)) {
      const items = craft.meterials.map(meterial => cga.getInventoryItems().find(item => item.name === meterial.name && item.count >= meterial.count))
      if (_.every(items, item => !!item)) {
        if (cga.CraftItem(skill.index, craftIndex, 0, items.map(item => item.pos))) {
          const result = await waitWorkingResult(2000)
          // 制药和料理要打开自动堆叠，所以这里容易出错
        } else {
          throw new Error(`制造出错`)
        }
      } else {
        log(`材料用完，停止制弓`)
        break
      }
    } else {
      throw new Error(`未能成功使用${skill.lv}级制弓技能制造${craft.name}`)
    }
  }
}

export {
  craftBow,
}

