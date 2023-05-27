import { Orientation, WorldStatus, cga } from '../cga'
import * as team from '../team'
import { log } from '../utils'

const defaultProtecter = async () => {
  if (team.isSomeoneInDanger()) {
    // 如果有人血量低，等3秒让他喝血瓶或急救
    await cga.delay(3000)
  }

  if (team.isLackOfMana()) {
    // 所有法系都缺魔，等3秒让他吃料理
    await cga.delay(3000)
  }

  // 如果自补后还是血量低或缺魔，说明可能没血瓶和料理了，停止遇敌
  return team.isSomeoneInDanger() || team.isLackOfMana()
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

    // 在走路时才判断
    if (cga.GetWorldStatus() === WorldStatus.Idle) {
      if (shouldStop && await shouldStop()) {
        log(`触发保护，停止遇敌`)
        break
      }
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

