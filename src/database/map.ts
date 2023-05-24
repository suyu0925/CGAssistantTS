import { cga } from '../cga'
import { MapName } from '../cga/types/map'

export type Map = {
  name: MapName
  unique_name?: string // 如果有重名，需要用这个名字来区分。比如法兰城的东医和西医的name都是“医院”
  index: number
}

export type DehydratedMap = Partial<Map> | string | number // 脱水的Map，可以再水合回去

export const Maps: Map[] = [
  { name: '法兰城', index: 1000, },
  { name: '召唤之间', index: 1530, },
  { name: '回廊', index: 1531, },
  { name: '医院', index: 1112, unique_name: '东医' },
  { name: '芙蕾雅', index: 100, },
  { name: '魔女之家', index: 1160, },
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
  if (!map && typeof dehydratedMap === 'string') {
    map = getCurrentMap()
  }
  return map
}

export const isStationInMap = (station: Station, map: DehydratedMap) => {
  const stationMap = hydrateMap(station.map)
  return isSameMap(stationMap, hydrateMap(map))
}
