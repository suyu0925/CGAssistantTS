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
  { from: '灵堂内侧', to: '灵堂', talk: ['士兵托葛利', DefaultDialogStrategies.Confirm], },
  { from: '封印之间', to: '城内的地下迷宫1楼', walk: [15, 18], },
  { from: '封印之间', to: '灵堂内侧', walk: [15, 2], },
  { from: '芙蕾雅', to: { map: '法兰城', x: 227, y: 88 }, walk: [470, 196], },
  { from: '芙蕾雅', to: '山男的家', walk: [509, 153], },
  { from: '山男的家', to: '芙蕾雅', walk: [7, 14], },
  { from: '法兰城', to: { map: '芙蕾雅西边', x: 374, y: 195 }, walk: [22, 88], },
  { from: '法兰城', to: { map: '芙蕾雅', x: 475, y: 196 }, walk: [281, 88], },
  { from: '法兰城', to: '西医', walk: [82, 83], },
  { from: '西医', to: '法兰城', walk: [12, 42], },
  { from: '法兰城', to: '职业介绍所', walk: [195, 50], },
  { from: '职业介绍所', to: '法兰城', walk: [2, 10], },
  { from: '法兰城', to: '艾文蛋糕店', walk: [216, 148], },
  { from: '艾文蛋糕店', to: '法兰城', walk: [0, 9], },
  { from: '芙蕾雅西边', to: '国营第24坑道 地下1楼', walk: [351, 145], },
  { from: '国营第24坑道 地下1楼', to: '试炼之洞窟 第1层', walk: [9, 5], },
  { from: '试炼之洞窟 第1层', to: '试炼之洞窟 第2层', walk: [33, 31], },
  { from: '试炼之洞窟 第2层', to: '试炼之洞窟 第3层', walk: [22, 42], },
  { from: '试炼之洞窟 第3层', to: '试炼之洞窟 第4层', walk: [42, 34], },
  { from: '试炼之洞窟 第4层', to: '试炼之洞窟 第5层', walk: [27, 12], },
  { from: '试炼之洞窟 第5层', to: '试炼之洞窟 大厅', walk: [39, 36], },
  { from: '芙蕾雅西边', to: '圣拉鲁卡村', walk: [134, 218], },
  { from: '圣拉鲁卡村', to: '芙蕾雅西边', walk: [52, 55], },
  { from: '圣拉鲁卡村', to: '圣村医院', walk: [37, 50], },
  { from: '圣村医院', to: '圣拉鲁卡村', walk: [1, 9], },
  { from: '圣村医院', to: '圣村医院 2楼', walk: [14, 11], },
  { from: '圣村医院 2楼', to: '圣村医院', walk: [14, 12], },
  { from: '里谢里雅堡', to: '里谢里雅堡 1楼', walk: [41, 50], },
  { from: '里谢里雅堡 1楼', to: '里谢里雅堡', walk: [74, 40], },
  { from: '里谢里雅堡 1楼', to: '里谢里雅堡厨房', walk: [103, 22], },
  { from: '里谢里雅堡厨房', to: '里谢里雅堡 1楼', walk: [8, 16], },
  { from: '里谢里雅堡', to: '召唤之间', walk: [47, 85], },
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
