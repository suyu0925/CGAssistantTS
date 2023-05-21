import { promisify } from 'util'
import { cga, FalanPortal } from '../cga'

const toStone = async (portal: FalanPortal) => {
  await promisify(cga.travel.falan.toStone)(portal)
}

export default {
  toStone,
}
