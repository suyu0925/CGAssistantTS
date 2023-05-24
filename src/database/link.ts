import { DehydratedMap, Station, getCurrentMap, isSameMap } from './map'

export type Link = {
  from: DehydratedMap
  to: DehydratedMap | Station
  walk?: [number, number]
  sayWords?: [number, number, string]
}

export const Links: Link[] = [
  { from: '召唤之间', to: '回廊', walk: [27, 8], },
  { from: '回廊', to: '召唤之间', walk: [44, 15], },
  { from: '回廊', to: '灵堂', walk: [23, 19], },
  { from: '灵堂', to: '回廊', walk: [31, 48], },
  { from: '芙蕾雅', to: { map: '法兰城', x: 227, y: 88 }, walk: [470, 196], },
  { from: '法兰城', to: { map: '芙蕾雅西边', x: 374, y: 195 }, walk: [22, 88], },
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
