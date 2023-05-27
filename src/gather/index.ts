import { HealthStatus, cga } from '../cga'
import { trade, exchange } from '../item'
import { GatheringSKill } from '../player/skill'
import { log } from '../utils'
import { ChopType, chopVanilla, chopWood } from './chopping'
import { hunting } from './hunting'
import { mining, zip } from './mining'

const honeSkill = async (skill: GatheringSKill, subtype?: any) => {
  const honedSkill = cga.findPlayerSkill(skill)
  if (!honedSkill) {
    throw new Error(`没有技能：${skill}`)
  }

  while (true) {
    if (skill === '伐木') {
      if (subtype === ChopType.Wood) {
        await trade.sellItems(['印度轻木'])
        await chopWood(honedSkill.lv - 1)
      } else if (subtype === ChopType.Vanilla) {
        await trade.sellItems(['苹果薄荷', '柠檬草', '蝴蝶花'])
        await chopVanilla(honedSkill.lv - 1)
      } else {
        throw new Error(`请指定伐木的ChopType`)
      }
    } else if (skill === '狩猎') {
      await trade.sellItems(['蕃茄', '鸡蛋', '牛奶', '小麦粉'])
      await hunting('鸡蛋')
    } else if (skill === '挖掘') {
      await trade.sellItems(['铜', '铜条'])
      // await zip('铜')
      await mining('铜')
      // await zip('铜')
      // await exchange.saveToBank('铜条')
    }

    if (cga.GetPlayerInfo().health > HealthStatus.Yellow) {
      log(`受受伤了，收手吧阿祖`)
      break
    }
  }
}

export * from './chopping'
export * from './hunting'
export * from './mining'
export * from './utils'
export {
  honeSkill,
}

