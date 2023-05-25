import { promisify } from 'util'
import { cga } from '../cga'
import { findPathToStation } from '../database/link'
import { DehydratedMap, Station, getCurrentMap, hydrateMap, isStationInMap } from '../database/map'
import { DehydratedNpc, hydrateNpc } from '../database/npc'
import falan from './falan'
import { getMovablePositionsAround, turnOrientation } from './utils'

const waitForMapChanged = async (newMapName: string, timeout: number = 3000) => {
  while (timeout > 0) {
    if (cga.GetMapName() === newMapName) {
      return true
    }
    await cga.delay(500)
    timeout -= 500
  }
  return false
}

const walkTo = async (x: number, y: number, newMapName?: string) => {
  // await promisify(cga.AsyncWalkTo)(x, y, newMapName ?? null, null, null)
  await promisify(cga.walkList)([[x, y, newMapName]])
}

const walkList = async (steps: [number, number, DehydratedMap | undefined][]) => {
  await promisify(cga.walkList)(steps.map(step => [
    step[0], step[1],
    step[2] === undefined
      ? undefined
      : (hydrateMap(step[2])?.name ?? step[2] as string),
  ]))
}

const walkToStation = async (station: Station) => {
  if (isStationInMap(station, getCurrentMap())) {
    await walkTo(station.x, station.y)
  } else {
    const path = await findPathToStation(station)
    const firstTo = path[0].to
    const firstMap =
      (typeof firstTo === 'object' && (firstTo as Station).map)
        ? (firstTo as Station).map
        : firstTo as DehydratedMap
    const nextNode: [number, number, DehydratedMap] = [path[0].walk![0], path[0].walk![1], firstMap]
    await walkList([nextNode])

    await faceToStation(station)
  }
}

const faceToStation = async (station: Station) => {
  if (isStationInMap(station, getCurrentMap())) {
    const movablePositionsAround = getMovablePositionsAround(station.x, station.y)
    if (movablePositionsAround.length === 0) {
      throw new Error(`无法到达地点：${JSON.stringify(station)}`)
    }
    await walkTo(movablePositionsAround[0].x, movablePositionsAround[0].y)
    cga.turnTo(station.x, station.y)
  } else {
    const path = await findPathToStation(station)
    const firstTo = path[0].to
    const firstMap =
      (typeof firstTo === 'object' && (firstTo as Station).map)
        ? (firstTo as Station).map
        : firstTo as DehydratedMap
    const nextNode: [number, number, DehydratedMap] = [path[0].walk![0], path[0].walk![1], firstMap]
    await walkList([nextNode])

    await faceToStation(station)
  }
}

const faceToNPC = async (hydratedNpc: DehydratedNpc) => {
  let npc = hydrateNpc(hydratedNpc)
  if (!npc) {
    throw new Error(`找不到NPC ${npc}`)
  }

  await faceToStation(npc.station)
}

const isMoving = () => {
  const speed = cga.GetMoveSpeed()
  return !(speed && speed.x === 0 && speed.y === 0)
}

export {
  falan,
  isMoving,
  walkTo,
  walkList,
  faceToNPC,
  walkToStation,
  faceToStation,
  getCurrentMap,
  turnOrientation as turnDir,
  waitForMapChanged,
}

