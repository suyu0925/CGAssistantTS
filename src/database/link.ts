import { DefaultDialogStrategies, DialogStrategy } from '../npc/dialog'
import { DehydratedMap, Station, getCurrentMap, isSameMap } from './map'

export type Link = {
  from: DehydratedMap
  to: DehydratedMap | Station
  walk?: [number, number]
  sayWords?: [number, number, string]
  talk?: [string, DialogStrategy[] | DialogStrategy]
}

export const Links: Link[] = [
  { from: '召唤之间', to: '回廊', walk: [27, 8], },
  { from: '召唤之间', to: '里谢里雅堡', walk: [3, 7], },
  { from: '回廊', to: '召唤之间', walk: [44, 15], },
  { from: '回廊', to: '灵堂', walk: [23, 19], },
  { from: '灵堂', to: '回廊', walk: [31, 48], },
  { from: '灵堂', to: '封印之间', talk: ['士兵伊岱鲁', DefaultDialogStrategies.Confirm], },
  { from: '灵堂', to: '灵堂地下牢房', walk: [7, 52], },
  { from: '灵堂地下牢房', to: '灵堂', walk: [27, 43], },
  { from: '灵堂内侧', to: '灵堂', talk: ['士兵托葛利', DefaultDialogStrategies.Confirm], },
  { from: '封印之间', to: '城内的地下迷宫1楼', walk: [15, 18], },
  { from: '封印之间', to: '灵堂内侧', walk: [15, 2], },
  { from: '芙蕾雅', to: { map: '法兰城', x: 227, y: 88 }, walk: [470, 196], },
  { from: '芙蕾雅', to: { map: '法兰城', x: 153, y: 235 }, walk: [424, 253], },
  { from: '芙蕾雅', to: '山男的家', walk: [509, 153], },
  { from: '芙蕾雅', to: { map: '维诺亚洞穴 地下1楼', x: 20, y: 14 }, talk: ['矿工潘丹', DefaultDialogStrategies.Confirm], },
  { from: '芙蕾雅', to: '伊尔村', walk: [681, 343], },
  { from: '伊尔村', to: '芙蕾雅', walk: [45, 31], },
  { from: '伊尔村', to: '伊尔村长的家', walk: [47, 83], },
  { from: '伊尔村长的家', to: '伊尔村', walk: [6, 13], },
  { from: '伊尔村长的家', to: '伊尔村的传送点', walk: [14, 17], },
  { from: '伊尔村的传送点', to: '伊尔村长的家', walk: [12, 17], },
  { from: '山男的家', to: '芙蕾雅', walk: [7, 14], },
  { from: '法兰城', to: { map: '芙蕾雅西边', x: 374, y: 195 }, walk: [22, 88], },
  { from: '法兰城', to: { map: '芙蕾雅', x: 475, y: 196 }, walk: [281, 88], },
  { from: '法兰城', to: { map: '芙蕾雅', x: 424, y: 259 }, walk: [153, 241], },
  { from: '法兰城', to: '西医', walk: [82, 83], },
  { from: '西医', to: '法兰城', walk: [12, 42], },
  { from: '法兰城', to: '职业介绍所', walk: [195, 50], },
  { from: '职业介绍所', to: '法兰城', walk: [2, 10], },
  { from: '法兰城', to: '艾文蛋糕店', walk: [216, 148], },
  { from: '艾文蛋糕店', to: '法兰城', walk: [0, 9], },
  { from: '法兰城', to: '凯蒂夫人的店', walk: [196, 78], },
  { from: '凯蒂夫人的店', to: '法兰城', walk: [4, 13], },
  { from: '法兰城', to: '基尔的家', walk: [200, 132], },
  { from: '基尔的家', to: '法兰城', walk: [8, 14], },
  { from: '法兰城', to: '米克尔工房', walk: [100, 61], },
  { from: '米克尔工房', to: '法兰城', walk: [6, 24], },
  { from: '法兰城', to: '冒险者旅馆', walk: [238, 64], },
  { from: '冒险者旅馆', to: '法兰城', walk: [7, 29], },
  { from: '法兰城', to: '流行商店', walk: [117, 112], },
  { from: '流行商店', to: '法兰城', walk: [0, 9], },
  { from: '法兰城', to: '法兰城仓库内部', walk: [61, 63], },  
  { from: '法兰城仓库内部', to: '法兰城', walk: [10, 16], },  
  { from: '芙蕾雅西边', to: '国营第24坑道 地下1楼', walk: [351, 145], },
  { from: '国营第24坑道 地下1楼', to: '试炼之洞窟 第1层', walk: [9, 5], },
  { from: '国营第24坑道 地下1楼', to: '国营第24坑道 地下2楼', walk: [22, 22], },
  { from: '国营第24坑道 地下2楼', to: '国营第24坑道 地下1楼', walk: [10, 25], },
  { from: '国营第24坑道 地下2楼', to: '国营第24坑道 地下3楼', walk: [23, 13], }, // 要矿山钥匙开门
  { from: '国营第24坑道 地下3楼', to: '国营第24坑道 地下2楼', walk: [35, 31], },
  { from: '国营第24坑道 地下3楼', to: '国营第24坑道 地下4楼 西北区', walk: [6, 3], }, // 银
  { from: '国营第24坑道 地下3楼', to: '国营第24坑道 地下4楼 东北区', walk: [29, 3], }, // 铁
  { from: '国营第24坑道 地下4楼 西北区', to: '国营第24坑道 地下3楼', walk: [21, 24], },
  { from: '国营第24坑道 地下4楼 东北区', to: '国营第24坑道 地下3楼', walk: [33, 30], },
  { from: '试炼之洞窟 第1层', to: '试炼之洞窟 第2层', walk: [33, 31], },
  { from: '试炼之洞窟 第2层', to: '试炼之洞窟 第3层', walk: [22, 42], },
  { from: '试炼之洞窟 第3层', to: '试炼之洞窟 第4层', walk: [42, 34], },
  { from: '试炼之洞窟 第4层', to: '试炼之洞窟 第5层', walk: [27, 12], },
  { from: '试炼之洞窟 第5层', to: '试炼之洞窟 大厅', walk: [39, 36], },
  { from: '芙蕾雅西边', to: '圣拉鲁卡村', walk: [134, 218], },
  { from: '圣拉鲁卡村', to: '芙蕾雅西边', walk: [52, 55], },
  { from: '圣拉鲁卡村', to: '圣村装备品店', walk: [32, 70], },
  { from: '圣拉鲁卡村', to: '圣村医院', walk: [37, 50], },
  { from: '圣拉鲁卡村', to: '圣村村长的家', walk: [49, 81], },
  { from: '圣拉鲁卡村', to: '赛杰利亚酒吧', walk: [39, 70], },
  { from: '赛杰利亚酒吧', to: '圣拉鲁卡村', walk: [2, 9], },
  { from: '圣村装备品店', to: '圣拉鲁卡村', walk: [19, 15], },
  { from: '圣村装备品店', to: '圣村装备品店 1楼小房间', walk: [14, 4], },
  { from: '圣村装备品店 1楼小房间', to: '圣村装备品店', walk: [11, 5], },
  { from: '圣村装备品店 1楼小房间', to: '圣村装备品店 地下工房', walk: [9, 3], },
  { from: '圣村装备品店 地下工房', to: '圣村装备品店 1楼小房间', walk: [23, 4], },
  { from: '圣村医院', to: '圣拉鲁卡村', walk: [1, 9], },
  { from: '圣村医院', to: '圣村医院 2楼', walk: [14, 11], },
  { from: '圣村医院 2楼', to: '圣村医院', walk: [14, 12], },
  { from: '圣村村长的家', to: '圣拉鲁卡村', walk: [2, 9], },
  { from: '圣村村长的家', to: '圣拉鲁卡村的传送点', walk: [8, 10], },
  { from: '圣村村长的家', to: '圣村村长的家 2楼', walk: [6, 14], },
  { from: '圣村村长的家 2楼', to: '圣村村长的家', walk: [7, 8], },
  { from: '圣拉鲁卡村的传送点', to: '圣村村长的家', walk: [7, 3], },
  { from: '里谢里雅堡', to: '里谢里雅堡 1楼', walk: [41, 50], },
  { from: '里谢里雅堡 1楼', to: '里谢里雅堡', walk: [74, 40], },
  { from: '里谢里雅堡 1楼', to: '里谢里雅堡厨房', walk: [103, 22], },
  { from: '里谢里雅堡厨房', to: '里谢里雅堡 1楼', walk: [8, 16], },
  { from: '里谢里雅堡', to: '召唤之间', walk: [47, 85], },
  { from: '偈见之间', to: '里谢里雅堡 2楼', walk: [9, 19], },
  { from: '里谢里雅堡 2楼', to: '偈见之间', walk: [50, 22], },
  { from: '里谢里雅堡 2楼', to: '里谢里雅堡 1楼', walk: [49, 80], },
  { from: '里谢里雅堡 1楼', to: '里谢里雅堡 2楼', walk: [74, 19], },
  { from: '维诺亚洞穴 地下1楼', to: '维诺亚', walk: [20, 14], },
  { from: '维诺亚洞穴 地下1楼', to: '维诺亚洞穴 地下2楼', walk: [20, 59], },
  { from: '维诺亚洞穴 地下2楼', to: '维诺亚洞穴 地下1楼', walk: [34, 14], },
  { from: '维诺亚洞穴 地下2楼', to: '维诺亚洞穴 地下3楼', walk: [24, 81], },
  { from: '维诺亚洞穴 地下3楼', to: '维诺亚洞穴 地下2楼', walk: [35, 10], },
  { from: '维诺亚洞穴 地下3楼', to: '芙蕾雅南边', walk: [26, 64], },
  { from: '芙蕾雅南边', to: '维诺亚洞穴 地下3楼', walk: [442, 349], },
  { from: '芙蕾雅南边', to: '维诺亚村', walk: [330, 480], },
  { from: '芙蕾雅南边', to: '索奇亚海底洞窟 地下1楼', walk: [343, 497], },
  { from: '维诺亚村', to: '芙蕾雅南边', walk: [66, 46], },
  { from: '维诺亚村', to: '维村医院', walk: [61, 53], },
  { from: '维诺亚村', to: '维村村长的家', walk: [40, 36], },
  { from: '维村医院', to: '维诺亚村', walk: [2, 9], },
  { from: '维村村长的家', to: '维诺亚村', walk: [9, 16], },
  { from: '维村村长的家', to: '维村村长家的小房间', walk: [18, 10], },
  { from: '维村村长家的小房间', to: '维村村长的家', walk: [0, 5], },
  { from: '维村村长家的小房间', to: '维诺亚村的传送点', walk: [8, 2], },
  { from: '维诺亚村的传送点', to: '维村村长家的小房间', walk: [5, 1], },
  { from: '索奇亚海底洞窟 地下1楼', to: '芙蕾雅南边', walk: [10, 5], },
  { from: '索奇亚海底洞窟 地下1楼', to: '索奇亚海底洞窟 地下2楼', walk: [18, 34], },
  { from: '索奇亚海底洞窟 地下2楼', to: '索奇亚海底洞窟 地下1楼', walk: [49, 46], },
  { from: '索奇亚海底洞窟 地下2楼', to: '索奇亚海底洞窟 地下1楼 索村侧', walk: [27, 29], },
  { from: '索奇亚海底洞窟 地下1楼 索村侧', to: '索奇亚海底洞窟 地下2楼', walk: [24, 13], },
]

export const searchLinks = (from: DehydratedMap): Link[] => {
  const result: Link[] = []
  for (const link of Links) {
    if (isSameMap(link.from, from)) {
      result.push(link)
    }
  }
  return result
}

const recursiveFindPath = (dest: DehydratedMap, path: Link[]): [boolean, Link[]] => {
  const latestTo = path[path.length - 1].to
  const latestMap =
    (typeof latestTo === 'object' && (latestTo as Station).map)
      ? (latestTo as Station).map
      : latestTo as DehydratedMap
  if (isSameMap(latestMap, dest)) {
    return [true, path]
  }
  const links = searchLinks(latestMap)
  for (const link of links) {
    const [resolved, resolvedPath] = recursiveFindPath(dest, path.concat(link))
    if (resolved) {
      return [resolved, resolvedPath]
    }
  }
  return [false, path]
}

export const findPathToStation = async (station: Station): Promise<Link[]> => {
  const startLinks = searchLinks(getCurrentMap())
  const [resolved, resolvedPath] = recursiveFindPath(station.map, startLinks)
  if (!resolved) {
    throw new Error(`没有路到达${station}`)
  }
  return resolvedPath
}
