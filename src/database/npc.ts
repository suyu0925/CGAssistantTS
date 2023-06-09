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
  { name: '山男哈葛利特', station: { map: '山男的家', x: 9, y: 3 }, id: 7681, model_id: 14124, }, // 用高级蕃茄换莫洛草。药剂师就职任务。
  { name: '蛋糕店的艾文', station: { map: '艾文蛋糕店', x: 12, y: 5 }, id: 7690, model_id: 14023, }, // 樵夫就职任务。孟宗竹换手斧。木材？换饼干。
  { name: '王宫召唤士盖兹', station: { map: '召唤之间', x: 19, y: 6 }, id: 7747, valid: 2, type: 1, model_id: 14071, level: 1, flags: 4096, },
  { name: '布商克萝姆', station: { map: '流行商店', x: 8, y: 5 }, id: 7880, model_id: 14022, },
  { name: '操作说明', station: { map: '回廊', x: 47, y: 9 }, id: 7856, model_id: 14071, },
  { name: '战斗说明', station: { map: '回廊', x: 23, y: 25 }, id: 7857, model_id: 14058, },
  { name: '凯蒂夫人', station: { map: '凯蒂夫人的店', x: 17, y: 12 }, id: 7860, model_id: 14018, },  // 鉴定NPC 
  { name: '测试者', station: { map: '灵堂', x: 54, y: 2 }, id: 7988, model_id: 17092, },
  { name: '鉴定师马尔弗', station: { map: '凯蒂夫人的店', x: 13, y: 9 }, id: 8018, model_id: 14014, },  // 矿工就职的任务链NPC
  { name: '矿工毕夫鲁', station: { map: '国营第24坑道 地下1楼', x: 35, y: 7 }, id: 8019, model_id: 14163, },  // 就职矿工的任务链NPC
  { name: '樵夫弗伦', station: { map: '法兰城', x: 106, y: 191 }, timeOfDay: 'day', id: 8026, model_id: 14108, }, // 就职樵夫任务。手斧换树苗。饼干换樵夫推荐信。
  { name: '种树的阿姆罗斯', station: { map: '法兰城', x: 134, y: 36 }, timeOfDay: 'day', id: 8027, model_id: 14025, }, // 就职樵夫任务。树苗换水色的花？。
  { name: '那尔薇', station: { map: '毕夫鲁的家', x: 8, y: 3 }, id: 8031, model_id: 14022, },  // 就职矿工的任务链NPC
  { name: '好眼力的霍依', station: { map: '冒险者旅馆', x: 14, y: 6 }, id: 8038, model_id: 14027, },  // 就职制造的任务链NPC
  { name: '矿工吉拉瓦特', station: { map: '圣村村长的家 2楼', x: 8, y: 4 }, id: 9848, model_id: 14162, },  // 矿工的就职导师
  { name: '传说的矿工基尔', station: { map: '基尔的家', x: 9, y: 2 }, id: 9746, model_id: 14027, },  // 学习`挖掘`技能
  { name: '传送石管理人', station: { map: '圣拉鲁卡村的传送点', x: 15, y: 3 }, id: 8051, model_id: 14073, },
  { name: '募集矿工的洛伊', station: { map: '维诺亚村的传送点', x: 16, y: 10 }, id: 9749, model_id: 14017, },  // 学习`挖掘体验`
  { name: '国王', station: { map: '偈见之间', x: 7, y: 3 }, id: 8057, model_id: 14052, },
  { name: '士兵亚瑟尔', station: { map: '里谢里雅堡 2楼', x: 47, y: 79 }, id: 8061, model_id: 14062, },
  { name: '传送石管理人', station: { map: '伊尔村的传送点', x: 21, y: 10 }, id: 8083, model_id: 14072, }, // 所有的传送石管理人都叫这名字，要靠id区分
  { name: '士兵伊岱鲁', station: { map: '灵堂', x: 9, y: 8 }, timeOfDay: ['dawn', 'twilight'], id: 8311, model_id: 14058, }, // 灵堂看门人。黄昏和黎明时出现
  { name: '士兵托葛利', station: { map: '灵堂', x: 11, y: 4 }, id: 8313, model_id: 14059, }, // 负责放人从灵堂内侧出来
  { name: '神木', station: { map: '芙蕾雅西边', x: 298, y: 148, range: [300, 156] }, timeOfDay: 'night', id: 8250, model_id: 10085, }, // 魔术
  { name: '佣兵艾里克', station: { map: '维村医院', x: 7, y: 5 }, id: 8640, model_id: 14156, },
  { name: '传送石管理人', station: { map: '维诺亚村的传送点', x: 5, y: 4 }, id: 8645, model_id: 14073, },
  { name: '战士巴其鲁', station: { map: '索奇亚海底洞窟 地下1楼 索村侧', x: 8, y: 37 }, id: 8698, model_id: 14109, }, // 拿热砂戒指可以过海的NPC
  { name: '资深护士菲儿', station: { map: '东医', x: 6, y: 33 }, id: 8917, model_id: 14152, },
  { name: '矿工潘丹', station: { map: '芙蕾雅', x: 472, y: 316 }, id: 8652, model_id: 14163, }, // 战斗系20级进熊洞
  { name: '护士尤美儿', station: { map: '东医', x: 8, y: 30 }, id: 8897, model_id: 14090, },
  { name: '贝特里夫医师', station: { map: '东医', x: 11, y: 18 }, id: 9256, model_id: 14088, }, // 治疗宠物
  { name: '护士米露卡', station: { map: '回廊', x: 26, y: 22 }, id: 9158, model_id: 14089, supply: true, },
  { name: '专管称号的阿蒙', station: { map: '法兰城', x: 230, y: 83 }, id: 9168, model_id: 14100, },
  { name: '乔尔凯夫', station: { map: '灵堂地下牢房', x: 33, y: 20 }, id: 9184, model_id: 14069, }, // 矿山的钥匙任务
  { name: '德米特夫', station: { map: '法兰城仓库内部', x: 12, y: 9 }, id: 9185, model_id: 14123, }, // 矿山的钥匙任务
  { name: '魔术师比尔艾特', station: { map: '魔女之家', x: 22, y: 9 }, id: 9206, model_id: 14044, }, // 学陨石魔法
  { name: '魔术师班裘', station: { map: '魔女之家', x: 21, y: 8 }, id: 9208, model_id: 14033, }, // 学冰冻魔法
  { name: '魔术师多萨德', station: { map: '魔女之家', x: 22, y: 17 }, id: 9210, model_id: 14030, }, // 学火焰魔法
  { name: '魔术师帕索比亚纳', station: { map: '魔女之家', x: 21, y: 14 }, id: 9212, model_id: 14046, }, // 学风刃魔法
  { name: '护士贝耶', station: { map: '维村医院', x: 13, y: 5 }, id: 9229, model_id: 14089, },
  { name: '资深护士蕾丹', station: { map: '维村医院', x: 15, y: 7 }, id: 9244, model_id: 14152, },
  { name: '见习药剂师吉可', station: { map: '西医', x: 12, y: 5 }, id: 9390, model_id: 14090, }, // 学习制药
  { name: '护士娜芝', station: { map: '西医', x: 12, y: 30 }, id: 9403, model_id: 14159, }, // 学习急救
  { name: '伯舒医师', station: { map: '西医', x: 10, y: 5 }, id: 9405, model_id: 14088, }, // 学习治疗
  { name: '山男波波思', station: { map: '山男的家', x: 10, y: 7 }, id: 9407, model_id: 14121, }, // 学习伐木
  { name: '狄尔西雅达美', station: { map: '魔女之家', x: 19, y: 13 }, id: 9441, model_id: 14506, }, // 魔术师就职导师
  { name: '药剂师柯尼', station: { map: '圣村医院 2楼', x: 12, y: 5 }, id: 9491, model_id: 14027, }, // 药剂师就职导师
  { name: '募集樵夫的阿空', station: { map: '职业介绍所', x: 8, y: 11 }, id: 9416, model_id: 14075, }, // 学习伐木体验
  { name: '募集打铁工的阿黑', station: { map: '职业介绍所', x: 9, y: 5 }, id: 9753, model_id: 14015, }, // 学习锻造体验
  { name: '交换铜', station: { map: '米克尔工房', x: 26, y: 4 }, id: 9476, model_id: 14076, },
  { name: '交换铁', station: { map: '米克尔工房', x: 28, y: 5 }, id: 9477, model_id: 14511, },
  { name: '交换银', station: { map: '米克尔工房', x: 30, y: 5 }, id: 9473, model_id: 14003, },
  { name: '交换纯银', station: { map: '米克尔工房', x: 27, y: 6 }, id: 9474, model_id: 14075, },
  { name: '交换金', station: { map: '米克尔工房', x: 24, y: 5 }, id: 9475, model_id: 14004, },
  { name: '交换白金', station: { map: '米克尔工房', x: 30, y: 7 }, id: 9478, model_id: 14512, },
  { name: '交换幻之钢', station: { map: '米克尔工房', x: 27, y: 10 }, id: 9479, model_id: 14012, },
  { name: '交换幻之银', station: { map: '米克尔工房', x: 28, y: 8 }, id: 9480, model_id: 14014, },
  { name: '造弓工飞利欧司', station: { map: '圣村装备品店 地下工房', x: 24, y: 15 }, id: 9699, model_id: 14536, }, // 学习造弓技能
  { name: '造杖工泛吉翁', station: { map: '圣村装备品店 地下工房', x: 37, y: 20 }, id: 9701, model_id: 14538, }, // 学习造杖技能
  { name: '造弓师傅梅葛拉', station: { map: '圣村装备品店 地下工房', x: 25, y: 18 }, id: 9800, model_id: 14537, }, // 造弓师就职导师
  { name: '造杖师傅希葛斯', station: { map: '圣村装备品店 地下工房', x: 38, y: 18 }, id: 9802, model_id: 14539, }, // 造杖师就职导师
  { name: '樵夫荷拉巴斯', station: { map: '职业介绍所', x: 7, y: 11 }, id: 9844, model_id: 14161, }, // 樵夫就职导师
  { name: '德吉', station: { map: '国营第24坑道 地下2楼', x: 24, y: 22 }, id: 14453, model_id: 14016, },
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

  if (npc.station.range) {
    // 针对随机位置的NPC，只使用当前位置
    const now = cga.findNPC(npc.name)
    npc.station.x = now.xpos
    npc.station.y = now.ypos
  }
  return npc
}
