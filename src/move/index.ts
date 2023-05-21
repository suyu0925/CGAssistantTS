import { promisify } from 'util'
import { cga } from '../cga'
import { findPathToStation } from '../database/link'
import { DehydratedMap, Station, getCurrentMap, hydrateMap, isStationInMap } from '../database/map'
import { DehydratedNpc, hydrateNpc } from '../database/npc'
import falan from './falan'
import { getMovablePositionsAround, turnOrientation } from './utils'

const waitForMapChanged = async (newMapName: string) => {
  while (true) {
    if (cga.GetMapName() === newMapName) {
      return
    }
    await cga.delay(300)
  }
}

const walkTo = async (x: number, y: number, newMapName?: string) => {
  // await promisify(cga.AsyncWalkTo)(x, y, newMapName ?? null, null, null)
  await promisify(cga.walkList)([[x, y, newMapName]])
}

const walkList = async (steps: [number, number, DehydratedMap][]) => {
  await promisify(cga.walkList)(steps.map(step => [
    step[0], step[1],
    hydrateMap(step[2]).name,
  ]))
}

const faceToStation = async (station: Station) => {
  if (isStationInMap(station, getCurrentMap())) {
    const movablePositionsAround = getMovablePositionsAround(station.x, station.y)
    if (movablePositionsAround.length === 0) {
      throw new Error(`无法到达地点：${JSON.stringify(station)}`)
    }
    await walkTo(movablePositionsAround[0].x, movablePositionsAround[0].y)
  } else {
    const path = await findPathToStation(station)
    const nextNode: [number, number, DehydratedMap] = [path[0].walk![0], path[0].walk![1], path[0].to]
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

export * from './falan'
export {
  falan,
  walkTo,
  walkList,
  faceToNPC,
  getCurrentMap,
  turnOrientation as turnDir,
  waitForMapChanged,
}

