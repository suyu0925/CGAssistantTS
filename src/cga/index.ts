import { promisify } from 'util'
import { ICgaApi } from './types'

export * from './types'

export let cga: ICgaApi

export const bootstrap = async (): Promise<ICgaApi> => {
  await new Promise(resolve => {
    const _cga: ICgaApi = require(process.env.CGA_DIR_PATH_UTF8 + '/cgaapi')(() => {
      cga = _cga
      resolve(cga)
    })
  })
  await promisify(cga.gui.LoadSettings)({
    player: {
      antiafkkick: true,
    }
  })
  return cga
}
