import { InventoryItem, SystemFlag, cga } from '../cga'
import { Station } from '../database/map'
import * as move from '../move'

const saveAllToBank = async () => {
  throw new Error('not implemented')
}

const moveItemsBetweenPlayers = async (fromPlayer: string, toPlayer: string, station: Station, filter: (item: InventoryItem) => boolean) => {
  const giver = fromPlayer === cga.GetPlayerInfo().name
  const receiver = toPlayer === cga.GetPlayerInfo().name
  if (!giver && !receiver) {
    return
  }

  cga.EnableFlags(SystemFlag.ENABLE_FLAG_TRADE, true)

  if (receiver) {
    await move.walkToStation(station)
  }else {
    await move.faceToStation(station)
  }
}

export {
  saveAllToBank,
}

