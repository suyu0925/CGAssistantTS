import { cga } from '../cga'
import * as move from '../move'
import * as npc from '../npc'

const Materials = [
  { name: '麻布', npc: '布商克萝姆', price: 20, index: 0, }
]

const buyMaterial = async (name: string, count: number) => {
  const material = Materials.find(m => m.name === name)
  if (!material) {
    throw new Error(`not support material: ${name}`)
  } else if (material.npc === '布商克萝姆') {
    await move.falan.toFashionShop()
  } else {
    throw new Error(`not support material: ${name}`)
  }
  const dlg = await npc.talkToNpc(material.npc, npc.DefaultDialogStrategies.FirstOnce)
  cga.BuyNPCStore([{ index: material.index, count, }])
  while (cga.getItemCount(name) < count) {
    await cga.delay(1000)
  }
}

export {
  buyMaterial,
}

