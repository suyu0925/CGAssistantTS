import { RequestType, cga } from '../cga'
import * as profession from './profession'
import * as skill from './skill'

const waitForPlayer = async (name: string) => {
  while (true) {
    const playerUnit = cga.findPlayerUnit(name)
    const mypos = cga.GetMapXY()
    if (playerUnit == null || !cga.isDistanceClose(playerUnit.xpos, playerUnit.ypos, mypos.x, mypos.y) || (playerUnit.xpos == mypos.x && playerUnit.ypos == mypos.y)) {
      await cga.delay(1000)
    } else {
      break
    }
  }
}

const joinTeam = () => {
  cga.DoRequest(RequestType.REQUEST_TYPE_JOINTEAM)
}

export {
  profession,
  skill,
  waitForPlayer,
  joinTeam,
}
