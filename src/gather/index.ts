import * as item from '../item'
import * as supply from '../supply'
import * as farm from '../farm'
import { ChopYinduQingmu } from './chopping'

const prepare = async () => {
  await farm.prepare()
}

const honeSkill = async (skill: string) => {
  while (true) {
    if (skill === '伐木') {
      await item.sellItems(['竹子', '孟宗竹', '印度轻木'])
      await ChopYinduQingmu()
    }
  }
}

export {
  prepare,
  honeSkill,
}
