import { bootstrap, cga } from './cga'
import { findPathToStation, searchLinks } from './database/link'
import { hydrateNpc } from './database/npc'
import * as npc from './npc'
import { DefaultDialogStrategies } from './npc/dialog'
import { loadSettings, log } from './utils'
import { doRequest } from './request'
import * as battle from './battle'
import * as supply from './supply'
import { getCurrentMap, isSameMap } from './database/map'
import { buyPotions, getPotionRecoveryAmount, sellStones } from './item'
import { prepare } from './farm'
import * as move from './move'
import * as farm from './farm'
import { promisify } from 'util'
import { shujing } from './farm/shujing'
import { learnSkill } from './player/skill'
// import { getSellItemList } from './item'

bootstrap()
  .then(async () => {
    // await npc.talkToNpc('王宫召唤士盖兹', DefaultDialogStrategies.Confirm)
    // log(await npc.talkToNpc('操作说明', DefaultDialogStrategies.Next))
    // log(cga.getMapInfo())
    // log(await findPathToStation({ map: '召唤之间', x: 19, y: 6 }))
    // log(cga.findNPC('药剂师波洛姆'))
    // await buyPotions(cga.GetPlayerInfo().maxhp)
    // await npc.talkToNpc('专管称号的阿蒙')
    // await npc.talkToNpc('测试者', DefaultDialogStrategies.Confirm)
    // await ringOfDeath()
    // log(cga.getInventoryItems())
    // await supply.hpmp()
    // log(getSellItemList())
    // await prepare()
    // log(cga.getTeamPlayers())
    // await move.walkList([
    //   // [12, 42, '法兰城'],
    //   // [281, 87, '芙蕾雅'], 
    //   [566, 233, '芙蕾雅'],
    // ])
    // await farm.farm('树精')
    // await shujing()
    // log(cga.findNPC('魔术师多萨德'))
    // await learnSkill('风刃魔法')

    battle.encounter()
  })
