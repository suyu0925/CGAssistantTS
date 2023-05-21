import { cga } from '../cga'
import { NpcId, NpcInfo } from '../cga/types/npc'
import { Station } from './map'

export type Npc = {
  id: NpcId
  name: string
  station: Station
  valid?: NpcInfo['valid']
  type?: NpcInfo['type']
  model_id?: NpcInfo['model_id']
  level?: NpcInfo['level']
  flags?: NpcInfo['flags']
  supply?: boolean // 是否可以补给
}

export type DehydratedNpc = NpcId | string | Npc

export const Npcs: Npc[] = [
  { name: '王宫召唤士盖兹', station: { map: '召唤之间', x: 19, y: 6 }, id: 7747, valid: 2, type: 1, model_id: 14071, level: 1, flags: 4096, },
  { name: '操作说明', station: { map: '回廊', x: 47, y: 9 }, id: 7856, model_id: 14071, },
  { name: '护士米露卡', station: { map: '回廊', x: 26, y: 22 }, id: 9158, model_id: 14089, supply: true, },
  { name: '战斗说明', station: { map: '回廊', x: 23, y: 25 }, id: 7857, model_id: 14058, },
  { name: '测试者', station: { map: '灵堂', x: 54, y: 2 }, id: 7988, model_id: 17092, },
]

const findNearbyNpc = (name: string): Npc | null => {
  const npcInfo = cga.findNPC(name)
  if (!npcInfo) {
    return null
  }
  return {
    id: npcInfo.unit_id,
    name: npcInfo.unit_name,
    station: { map: cga.GetMapName(), x: npcInfo.xpos, y: npcInfo.ypos }
  }
}

export const hydrateNpc = (dehydratedNpc: DehydratedNpc): Npc | null => {
  let npc: Npc | null = null

  if (typeof dehydratedNpc === 'string') {
    npc = Npcs.find(npc => dehydratedNpc === npc.name)
  } else if (typeof dehydratedNpc === 'number') {
    npc = Npcs.find(npc => dehydratedNpc === npc.id)
  } else {
    npc = dehydratedNpc
  }

  if (!npc && typeof dehydratedNpc === 'string') {
    npc = findNearbyNpc(dehydratedNpc)
  }
  return npc
}
