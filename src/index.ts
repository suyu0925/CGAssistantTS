import { bootstrap, cga } from './cga'
import { findPathToStation, searchLinks } from './database/link'
import { hydrateNpc } from './database/npc'
import * as npc from './npc'
import { DefaultDialogStrategies } from './npc/dialog'
import { loadSettings, log } from './utils'
import { doRequest } from './request'
import * as battle from './battle'
import * as supply from './supply'
import { Stations, getCurrentMap, isSameMap } from './database/map'
import * as item from './item'
import { prepare } from './farm'
import * as move from './move'
import * as team from './team'
import * as farm from './farm'
import * as gather from './gather'
import { promisify } from 'util'
import { learnSkill } from './player/skill'
import { learnSingleTargetElementSpells } from './request/profession/mage'
import * as request from './request'
import { chopWood, chopVanilla, ChopType } from './gather/chopping'
import { cureByself, curePetsInEastHospital } from './supply/injury'
import { craftPosions } from './craft'
import { getSellPosionItems } from './item/trade'
import * as trade from './item/trade'
import { incomingMiner } from './request/profession'
import { recursiveMining, zip } from './gather'

bootstrap()
  .then(async () => {
    // 功能
    // await prepare()
    // await move.falan.toStone('E')
    // await team.buildTeam(null, Stations['东门'])
    // battle.encounter()
    // log(cga.GetPlayerInfo())

    // log(cga.getMapInfo())
    // log(cga.findNPC('贝特里夫医师'))
    // await incomingMiner()
    // await curePetsInEastHospital()

    // log(await findPathToStation({ map: '召唤之间', x: 19, y: 6 }))
    // await buyPotions(cga.GetPlayerInfo().maxhp)
    // log(cga.getInventoryItems())
    // await supply.hpmp()
    // log(cga.getTeamPlayers())
    // await move.walkList([
    //   [509, 154, '芙蕾雅'],
    // ])
    await farm.farm('树精', '=一瓶药=')
    // await battle.encounter()
    // await move.register('维村')
    // await farm.farm('海底')
    // await shujing()
    // await move.falan.toCastle()

    // await doRequest('就职药剂师')
    // await doRequest('死者的戒指')
    // await request.profession.incomingWoodcutter()
    // await learnSingleTargetElementSpells()

    // log(getSellPosionItems())
    // log(getSellItemList())
    // await cureByself()

    // 采集系
    // await gather.honeSkill('伐木', ChopType.Vanilla)
    // await gather.honeSkill('挖掘')
    // await recursiveMining('铜')
    // await gather.honeSkill('狩猎')
    // await trade.sellItems(['苹果薄荷', '柠檬草', '蝴蝶花'])
    // await chopVanilla(1)
    // await chopWood(2)

    // 制造系
    // await craftPosions(3)
  })
