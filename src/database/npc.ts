import { cga } from '../cga'
import { NpcId, NpcInfo } from '../cga/types/npc'
import { TimeOfDay } from '../utils'
import { Station } from './map'

export type Npc = {
  id: NpcId
  name: string
  station: Station
  timeOfDay?: TimeOfDay | TimeOfDay[]
  valid?: NpcInfo['valid']
  type?: NpcInfo['type']
  model_id?: NpcInfo['model_id']
  level?: NpcInfo['level']
  flags?: NpcInfo['flags']
  supply?: boolean // 是否可以补给
}

export type DehydratedNpc = NpcId | string | Npc

export const Npcs: Npc[] = [
  { name: '药剂师波洛姆', station: { map: '东医', x: 16, y: 35 }, id: 7534, model_id: 14089, },
  { name: '料理长米其巴', station: { map: '里谢里雅堡厨房', x: 8, y: 6 }, id: 7669, model_id: 14065, },
  { name: '看护实习生德拉格', station: { map: '圣村医院', x: 8, y: 4 }, id: 7679, model_id: 14117, }, // 用莫洛草换药剂师就职推荐信。药剂师就职任务。
  { name: '山男哈葛利特', station: { map: '山男的家', x: 9, y: 3 }, id: 7681, model_id: 14124, }, // 用高级番茄换莫洛草。药剂师就职任务。
  { name: '蛋糕店的艾文', station: { map: '艾文蛋糕店', x: 12, y: 5 }, id: 7690, model_id: 14023, }, // 樵夫就职任务。孟宗竹换手斧。木材？换饼干。
  { name: '王宫召唤士盖兹', station: { map: '召唤之间', x: 19, y: 6 }, id: 7747, valid: 2, type: 1, model_id: 14071, level: 1, flags: 4096, },
  { name: '操作说明', station: { map: '回廊', x: 47, y: 9 }, id: 7856, model_id: 14071, },
  { name: '战斗说明', station: { map: '回廊', x: 23, y: 25 }, id: 7857, model_id: 14058, },
  { name: '测试者', station: { map: '灵堂', x: 54, y: 2 }, id: 7988, model_id: 17092, },
  { name: '国王', station: { map: '偈见之间', x: 7, y: 3 }, id: 8057, model_id: 14052, },
  { name: '士兵亚瑟尔', station: { map: '里谢里雅堡 2楼', x: 47, y: 79 }, id: 8061, model_id: 14062, },
  { name: '士兵伊岱鲁', station: { map: '灵堂', x: 9, y: 8 }, timeOfDay: ['dawn', 'twilight'], id: 8311, model_id: 14058, }, // 灵堂看门人。黄昏和黎明时出现
  { name: '士兵托葛利', station: { map: '灵堂', x: 11, y: 4 }, id: 8313, model_id: 14059, }, // 负责放人从灵堂内侧出来
  { name: '神木', station: { map: '芙蕾雅西边', x: 298, y: 148, range: [300, 156] }, timeOfDay: 'night', id: 8250, model_id: 10085, }, // 魔术
  { name: '资深护士菲儿', station: { map: '东医', x: 6, y: 33 }, id: 8917, model_id: 14152, },
  { name: '护士尤美儿', station: { map: '东医', x: 8, y: 30 }, id: 8897, model_id: 14090, },
  { name: '护士米露卡', station: { map: '回廊', x: 26, y: 22 }, id: 9158, model_id: 14089, supply: true, },
  { name: '专管称号的阿蒙', station: { map: '法兰城', x: 230, y: 83 }, id: 9168, model_id: 14100, },
  { name: '魔术师比尔艾特', station: { map: '魔女之家', x: 22, y: 9 }, id: 9206, model_id: 14044, }, // 学陨石魔法
  { name: '魔术师班裘', station: { map: '魔女之家', x: 21, y: 8 }, id: 9208, model_id: 14033, }, // 学冰冻魔法
  { name: '魔术师多萨德', station: { map: '魔女之家', x: 22, y: 17 }, id: 9210, model_id: 14030, }, // 学火焰魔法
  { name: '魔术师帕索比亚纳', station: { map: '魔女之家', x: 21, y: 14 }, id: 9212, model_id: 14046, }, // 学风刃魔法
  { name: '见习药剂师吉可', station: { map: '西医', x: 12, y: 5 }, id: 9390, model_id: 14090, }, // 学习制药
  { name: '护士娜芝', station: { map: '西医', x: 12, y: 30 }, id: 9403, model_id: 14159, }, // 学习急救
  { name: '伯舒医师', station: { map: '西医', x: 10, y: 5 }, id: 9405, model_id: 14088, }, // 学习治疗
  { name: '山男波波思', station: { map: '山男的家', x: 10, y: 7 }, id: 9407, model_id: 14121, }, // 学习伐木
  { name: '狄尔西雅达美', station: { map: '魔女之家', x: 19, y: 13 }, id: 9441, model_id: 14506, }, // 魔术师就职导师
  { name: '药剂师柯尼', station: { map: '圣村医院 2楼', x: 12, y: 5 }, id: 9491, model_id: 14027, }, // 药剂师就职导师
  { name: '募集樵夫的阿空', station: { map: '职业介绍所', x: 8, y: 11 }, id: 9416, model_id: 14075, }, // 学习伐木体验
  { name: '樵夫弗伦', station: { map: '法兰城', x: 106, y: 191 }, timeOfDay: 'day', id: 8026, model_id: 14108, }, // 就职樵夫任务。手斧换树苗。饼干换樵夫推荐信。
  { name: '种树的阿姆罗斯', station: { map: '法兰城', x: 134, y: 36 }, timeOfDay: 'day', id: 8027, model_id: 14025, }, // 就职樵夫任务。树苗换水色的花？。
  { name: '樵夫荷拉巴斯', station: { map: '职业介绍所', x: 7, y: 11 }, id: 9844, model_id: 14161, }, // 樵夫就职导师
  { name: '平民防具贩售处', station: { map: '法兰城', x: 156, y: 122 }, id: 14561, model_id: 14183, },
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
