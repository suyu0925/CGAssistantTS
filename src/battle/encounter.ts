import { Orientation, cga } from '../cga'
import { log } from '../utils'
import * as team from '../team'

const defaultProtecter = async () => {
  if (team.isSomeoneInDanger()) {
    // 如果有人血量低，等3秒让他喝血瓶或急救
    await cga.delay(3000)
  }
  // 如果自补后还是血量低，说明他可能没血瓶了，停止遇敌
  return team.isSomeoneInDanger()
}

const encounter = async (shouldStop: () => Promise<boolean> = defaultProtecter) => {
  const oppositeDirTable: Orientation[] = [4, 5, 6, 7, 0, 1, 2, 3]
  const startPos = cga.GetMapXY()
  const dir = cga.getRandomSpaceDir(startPos.x, startPos.y)
  log('开启高速遇敌...')
  while (true) {
    const pos = cga.GetMapXY()
    if (pos.x === startPos.x && pos.y === startPos.y) {
      cga.ForceMove(dir, true)
    } else {
      cga.ForceMove(oppositeDirTable[dir], true)
    }
    await cga.delay(300)

    if (shouldStop && await shouldStop()) {
      log(`触发保护，停止遇敌`)
      break
    }
  }
}

const encounter_ = async () => {
  const startPos = cga.GetMapXY()
  const dir = cga.getRandomSpaceDir(startPos.x, startPos.y)
  log('开启高速遇敌...')
  cga.freqMove(dir)
}

export {
  encounter,
}

