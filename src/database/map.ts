import { cga } from '../cga'
import { MapName } from '../cga/types/map'

export type Map = {
  name: MapName
  unique_name?: string // 如果有重名，需要用这个名字来区分。比如法兰城的东医和西医的name都是“医院”
  index: number
}

export type DehydratedMap = Partial<Map> | string | number // 脱水的Map，可以再水合回去

export const Maps: Map[] = [
  { name: '芙蕾雅', index: 100, },
  { name: '芙蕾雅', index: 100, unique_name: '芙蕾雅西边' },
  { name: '法兰城', index: 1000, },
  { name: '职业介绍所', index: 1091, },
  { name: '医院', index: 1111, unique_name: '西医' },
  { name: '医院', index: 1112, unique_name: '东医' },
  { name: '艾文蛋糕店', index: 1151, },
  { name: '山男的家', index: 1155, },
  { name: '魔女之家', index: 1160, },
  { name: '里谢里雅堡', index: 1500, },
  { name: '厨房', index: 1502, unique_name: '里谢里雅堡厨房' },
  { name: '里谢里雅堡 1楼', index: 1520, },
  { name: '召唤之间', index: 1530, },
  { name: '回廊', index: 1531, },
  { name: '封印之间', index: 1538, },
  { name: '城内的地下迷宫1楼', index: -1, },
  { name: '圣拉鲁卡村', index: 2300, },
  { name: '医院', index: 2310, unique_name: '圣村医院' },
  { name: '医院 2楼', index: 2311, unique_name: '圣村医院 2楼' },
  { name: '国营第24坑道 地下1楼', index: 11013 },
  { name: '国营第24坑道 地下1楼', index: 11013, unique_name: '国营第24坑道 地下1楼西边' },
  { name: '试炼之洞窟 第1层', index: 11006 },
  { name: '试炼之洞窟 第2层', index: 11007 },
  { name: '试炼之洞窟 第3层', index: 11008 },
  { name: '试炼之洞窟 第4层', index: 11009 },
  { name: '试炼之洞窟 第5层', index: 11010 },
  { name: '试炼之洞窟 大厅', index: 11011 },
  { name: '灵堂', index: 11015, },
  { name: '灵堂', index: 11015, unique_name: '灵堂内侧' },
]

export type Station = {
  map: DehydratedMap
  x: number
  y: number
  range?: [number, number] // 随机出现的范围
}

export const Stations = {
  '东门': { map: '法兰城', x: 240, y: 87 },
}

export const getCurrentMap = (): Map => {
  return {
    name: cga.GetMapName(),
    index: cga.GetMapIndex().index3,
  }
}

export const isHybratedMap = (map: DehydratedMap): boolean => {
  if (typeof map === 'string') {
    return false
  } else if (typeof map === 'number') {
    return false
  } else if (map.index !== undefined) {
    return true
  } else {
    return false
  }
}

export const isSameMap = (dehydratedSource: DehydratedMap, dehydratedTarget: DehydratedMap) => {
  const source = hydrateMap(dehydratedSource)
  const target = hydrateMap(dehydratedTarget)
  if ((source.unique_name && source.unique_name === target.unique_name)
    || (source.index === target.index)) {
    return true
  } else {
    return false
  }
}

export const searchMapByName = (nameOrUniqueName: string): Map | undefined => {
  let map: Map | undefined = undefined
  // 先用unique_name找一遍
  map = Maps.find(map => map.unique_name === nameOrUniqueName)
  // 如果用unique_name没找到，再用name找一遍
  if (!map) {
    map = Maps.find(map => map.name === nameOrUniqueName)
  }
  return map
}

export const searchMapByIndex = (index: number): Map | null => {
  let map: Map | null = null
  map = Maps.find(map => map.index === index)
  if (!map) {
    map = null
  }
  return map
}

export const hydrateMap = (dehydratedMap: DehydratedMap): Map | null => {
  // 空字符串当作当前地图处理
  if (typeof dehydratedMap === 'string' && dehydratedMap.trim() === '') {
    return getCurrentMap()
  }

  let map: Map | null = null
  if (isHybratedMap(dehydratedMap)) {
    map = { ...dehydratedMap as Map }
  } else if (typeof dehydratedMap === 'string') {
    map = searchMapByName(dehydratedMap)
  } else if (typeof dehydratedMap === 'number') {
    map = searchMapByIndex(dehydratedMap)
  } else {
    map = searchMapByName(dehydratedMap.unique_name ?? dehydratedMap.name)
  }

  // 如果还是匹配不到，试试当前地图。
  // 如果想补充数据库，可以关闭这个判断。
  if (false && !map) {
    const cur = getCurrentMap()
    if ((typeof dehydratedMap === 'string' && dehydratedMap === cur.name)
      || (typeof dehydratedMap === 'number' && dehydratedMap === cur.index)) {
      map = cur
    }
  }

  return map
}

export const isStationInMap = (station: Station, map: DehydratedMap) => {
  const stationMap = hydrateMap(station.map)
  return isSameMap(stationMap, hydrateMap(map))
}
