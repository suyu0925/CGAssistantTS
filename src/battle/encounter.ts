import { cga } from '../cga'
import { log } from '../utils'

const encounter = () => {
  const pos = cga.GetMapXY()
  const dir = cga.getRandomSpaceDir(pos.x, pos.y)
  log('开启高速遇敌...')
  cga.freqMove(dir)
}

export {
  encounter,
}

