import { promisify } from 'util'
import { cga, FalanPortal } from '../cga'
import { getCurrentMap, isSameMap } from '../database/map'

const toStone = async (portal: FalanPortal) => {
  await promisify(cga.travel.falan.toStone)(portal)
}

const toEastHospital = async () => {
  if (isSameMap(getCurrentMap(), '东医')) {
    return
  }
  await promisify(cga.travel.falan.toEastHospital)()
}

export default {
  toStone,
  toEastHospital,
}
