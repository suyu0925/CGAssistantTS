import { promisify } from 'util'
import { WorkingResult, cga } from '../cga'
import * as profession from './profession'
import * as skill from './skill'

const waitPlayerMenu = async () => {
  return await promisify(cga.AsyncWaitPlayerMenu)()
}

const waitUnitMenu = async () => {
  return await promisify(cga.AsyncWaitUnitMenu)()
}

const waitWorkingResult = async (timeoutMs: number = 1000): Promise<WorkingResult> => {
  return new Promise((resolve, reject) => {
    cga.AsyncWaitWorkingResult((err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    }, timeoutMs)
  })
}

export {
  profession,
  skill,
  waitPlayerMenu,
  waitUnitMenu,
  waitWorkingResult,
}

