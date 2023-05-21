import { cga } from '../cga'
import { MapIndex, MapName } from '../cga/types/map'

export type Map = {
  name: MapName
  unique_name?: string // 如果有重名，需要用这个名字来区分。比如法兰城的东医和西医的name都是“医院”
} & MapIndex

export type DehydratedMap = Partial<Map> | string | number // 脱水的Map，可以再水合回去

export const Maps: Map[] = [
  // { name: '法兰城', },
  { name: '召唤之间', index1: 0, index2: 5, index3: 1530, },
  { name: '回廊', index1: 0, index2: 5, index3: 1531, },
]

export type Station = {
  map: DehydratedMap
  x: number
  y: number
}

export const getCurrentMap = (): Map => {
  return {
    name: cga.GetMapName(),
    ...cga.GetMapIndex(),
  }
}

export const isHybratedMap = (map: DehydratedMap): boolean => {
  if (typeof map === 'string') {
    return false
  } else if (typeof map === 'number') {
    return false
  } else if (map.index3 !== undefined) {
    return true
  } else {
    return false
  }
}

export const isSameMap = (dehydratedSource: DehydratedMap, dehydratedTarget: DehydratedMap) => {
  const source = hydrateMap(dehydratedSource)
  const target = hydrateMap(dehydratedTarget)
  if ((source.unique_name && source.unique_name === target.unique_name)
    || (source.index1 === target.index1
      && source.index2 === target.index2
      && source.index3 === target.index3)) {
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

export const searchMapByIndex3 = (index3: number): Map | null => {
  let map: Map | null = null
  map = Maps.find(map => map.index3 === index3)
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
    map = searchMapByIndex3(dehydratedMap)
  } else {
    map = searchMapByName(dehydratedMap.unique_name ?? dehydratedMap.name)
  }
  if (!map && typeof dehydratedMap === 'string') {
    map = {
      name: cga.GetMapName(),
      ...cga.GetMapIndex(),
    }
  }
  return map
}

export const isStationInMap = (station: Station, map: DehydratedMap) => {
  const stationMap = hydrateMap(station.map)
  return isSameMap(stationMap, hydrateMap(map))
}
