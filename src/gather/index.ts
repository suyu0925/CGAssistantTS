import * as item from '../item'
import * as supply from '../supply'
import * as farm from '../farm'
import { LoggingYinduQingmu } from './logging'

const prepare = async () => {
  await farm.prepare()
}

const honeSkill = async (skill: string) => {
  while (true) {
    if (skill === '伐木') {
      await LoggingYinduQingmu()
      await item.sellItems(['竹子', '孟宗竹', '印度轻木'])
    }
  }
}

export {
  prepare,
  honeSkill,
}
