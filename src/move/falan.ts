import { promisify } from 'util'
import { cga, FalanPortal } from '../cga'
import { getCurrentMap, isSameMap } from '../database/map'
import * as move from '../move'
import * as npc from '../npc'
import { sayWords } from '../player'
import { log } from '../utils'

const toStone = async (portal: FalanPortal) => {
  await promisify(cga.travel.falan.toStone)(portal)
}

const toEastHospital = async () => {
  if (isSameMap(getCurrentMap(), '东医')) {
    return
  }
  await promisify(cga.travel.falan.toEastHospital)()
}

const toWestHospital = async () => {
  if (isSameMap(getCurrentMap(), '西医')) {
    return
  }
  await promisify(cga.travel.falan.toWestHospital)()
}

const toCastle = async () => {
  if (isSameMap(getCurrentMap(), '里谢里雅堡')) {
    return
  }

  await promisify(cga.travel.falan.toCastle)()
}

// 魔女之家
const toWitchHouse = async () => {
  if (isSameMap(getCurrentMap(), '魔女之家')) {
    return
  }

  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [298, 148, undefined],
  ])

  await npc.waitForNpc('神木')
  await npc.talkToNpc('神木', npc.DefaultDialogStrategies.Confirm)
  sayWords('魔术')
  const dlg = await npc.waitNPCDialog()
  log(dlg)
  cga.ClickNPCDialog(1, -1)
  await move.waitForMapChanged('魔女之家')
}

// 去流行商店
const toFashionShop = async () => {
  if (isSameMap(getCurrentMap(), '流行商店')) {
    return
  }

  await move.falan.toStone('W')
  await move.walkList([
    [117, 112, '流行商店'],
  ])
}

// 走去圣村
const toShencun = async () => {
  if (isSameMap(getCurrentMap(), '圣拉鲁卡村')) {
    return
  }

  await move.falan.toStone('W')
  await move.walkList([
    [22, 88, '芙蕾雅西边'],
    [134, 218, '圣拉鲁卡村'],
  ])
}

export default {
  toStone,
  toEastHospital,
  toWestHospital,
  toCastle,
  toWitchHouse,
  toShencun,
  toFashionShop,
}
