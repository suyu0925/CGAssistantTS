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
  { name: '护士尤美儿', station: { map: '东医', x: 8, y: 30 }, id: 8897, model_id: 14090, },
  { name: '资深护士菲儿', station: { map: '东医', x: 6, y: 33 }, id: 8917, model_id: 14152, },
  { name: '药剂师波洛姆', station: { map: '东医', x: 16, y: 35 }, id: 7534, model_id: 14089, },
  { name: '专管称号的阿蒙', station: { map: '法兰城', x: 230, y: 83 }, id: 9168, model_id: 14100, },
  { name: '神木', station: { map: '芙蕾雅西边', x: 298, y: 148, range: [300, 156] }, id: 8250, model_id: 10085, }, // 魔术
  { name: '魔术师比尔艾特', station: { map: '魔女之家', x: 22, y: 9 }, id: 9206, model_id: 14044, }, // 学冰冻魔法
  { name: '魔术师班裘', station: { map: '魔女之家', x: 21, y: 8 }, id: 9208, model_id: 14033, }, // 学陨石魔法
  { name: '魔术师多萨德', station: { map: '魔女之家', x: 22, y: 17 }, id: 9210, model_id: 14030, }, // 学火焰魔法
  { name: '魔术师帕索比亚纳', station: { map: '魔女之家', x: 21, y: 14 }, id: 9212, model_id: 14046, }, // 学风刃魔法
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
