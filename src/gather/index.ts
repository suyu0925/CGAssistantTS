import { HealthStatus, cga } from '../cga'
import * as farm from '../farm'
import * as item from '../item'
import { log } from '../utils'
import { ChopType, chopVanilla, chopWood } from './chopping'

const prepare = async () => {
  await farm.prepare()
}

const honeSkill = async (skill: string, subtype: any) => {
  while (true) {
    if (skill === '伐木') {
      if (subtype === ChopType.Wood) {
        await item.sellItems(['印度轻木'])
        await chopWood(1)
      } else if (subtype === ChopType.Vanilla) {
        await item.sellItems(['印度轻木'])
        await item.sellItems(['柠檬草'])
        await chopVanilla(1)
      }
    }

    if (cga.GetPlayerInfo().health !== HealthStatus.Normal) {
      log(`受伤了，收手吧阿祖`)
      break
    }
  }
}

export {
  prepare,
  honeSkill,
}

