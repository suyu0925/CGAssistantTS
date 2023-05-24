import { encounter } from '../battle'
import * as move from '../move'

const shujing = async () => {
  await move.walkList([
    [281, 87, '芙蕾雅'],
    [566, 233, '芙蕾雅'],
  ])

  encounter()
}

export {
  shujing,
}
