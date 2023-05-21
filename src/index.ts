import { bootstrap, cga } from './cga'
import { findPathToStation, searchLinks } from './database/link'
import { hydrateNpc } from './database/npc'
import * as npc from './npc'
import { DefaultDialogStrategies } from './npc/dialog'
import { log } from './utils'
import { ringOfDeath } from './request'

bootstrap()
  .then(async () => {
    // await npc.talkToNpc('王宫召唤士盖兹', DefaultDialogStrategies.Confirm)
    // console.log(await npc.talkToNpc('操作说明', DefaultDialogStrategies.Next))
    // console.log(cga.getMapInfo())
    // console.log(await findPathToStation({ map: '召唤之间', x: 19, y: 6 }))
    // await npc.faceToNPC('王宫召唤士盖兹')
    // console.log(cga.findNPC('测试者'))
    // await npc.talkToNpc('测试者', DefaultDialogStrategies.Confirm)
    await ringOfDeath()
  })
