import { cga } from '../cga'
import * as move from '../move'
import * as npc from '../npc'
import { profession } from '../player'
import { loadSettings, log } from '../utils'

const needPlayerSupply = () => {
  const playerInfo = cga.GetPlayerInfo()
  const lackOfHp = playerInfo.maxhp - playerInfo.hp
  const lackOfMp = playerInfo.maxmp - playerInfo.mp
  if (lackOfMp && playerInfo.gold < lackOfMp) {
    log(`缺${lackOfMp}点魔，但钱不够补`)
  }
  return (lackOfHp && (playerInfo.level < 10 || playerInfo.gold >= lackOfHp))
    || (lackOfMp && playerInfo.gold >= lackOfMp)
}

const needPetSupply = (onlyCurrentPet?: boolean) => {
  const playerInfo = cga.GetPlayerInfo()
  const petIds = onlyCurrentPet ? [playerInfo.petid] : [0, 1, 2, 3, 4]
  const petNeedSupply = petIds.some(petId => {
    if (petId === -1) {
      return false
    }
    const pet = cga.GetPetInfo(petId)
    return pet.hp < pet.maxhp || pet.mp < pet.maxmp
  })
  return petNeedSupply
}

const needSupply = (onlyCurrentPet?: boolean) => {
  return needPlayerSupply() || needPetSupply(onlyCurrentPet)
}

const supplyHpMp = async () => {
  if (!needSupply()) {
    log(`无需补给。`)
    return
  }

  await loadSettings({ player: { autosupply: true } })

  await move.falan.toEastHospital() // 默认东医补给

  const nurse = profession.isMageClass() ? '资深护士菲儿' : '护士尤美儿'
  await npc.talkToNpc(nurse)

  // TODO: use await waitForHpMpSupply()
  await cga.delay(3000)

  if (!needSupply()) {
    log(`很好，很有精神！状态满满！`)
  } else {
    log(`补给出错，请手动补给`)
  }
}

export {
  needSupply,
  supplyHpMp,
}

