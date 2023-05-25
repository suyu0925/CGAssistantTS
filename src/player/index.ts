import { promisify } from 'util'
import * as profession from './profession'
import * as skill from './skill'
import { cga } from '../cga'

const waitPlayerMenu = async () => {
  return await promisify(cga.AsyncWaitPlayerMenu)()
}

const waitUnitMenu = async () => {
  return await promisify(cga.AsyncWaitUnitMenu)()
}

const waitWorkingResult = async () => {
  return await promisify(cga.AsyncWaitWorkingResult)()
}

export {
  profession,
  skill,
  waitPlayerMenu,
  waitUnitMenu,
  waitWorkingResult,
}

