// 0 头 1 衣服 2 左手 3 右手 4 鞋 5 左饰品 6 右饰品 7 水晶

export type InventoryItem = {
  name: string // 物品名称。如：魔石
  info: string // 物品信息。如：$4魔族力量的来源
  attr: string // 物品属性说明。如：$4等级 1\n$0种类 不明
  count: number // 物品堆叠数量。如果不能堆叠则为0。
  itemid: number // 物品id。如：18047
  pos: number // 在背包里的位置，从8开始，27结束。可能0-7空出来给装备。
  level: number // 物品等级。如无等级为1。
  type: number // 物品类型。暂时没发现除了26以外的值。
  assessed: boolean // 是否鉴定过。无需鉴定的都为true。其实未鉴定过的道具也可以靠itemid知晓是什么东西。
}

export type SellItem = {
  itempos: number
  itemid: number
  count: number
}

export type BuyItem = {
  index: number
  count: number
}

export interface IItemApi {
  // 背包里的物品
  getInventoryItems: () => InventoryItem[]
  // 所有物品，包括身上的装备
  GetItemsInfo: () => InventoryItem[]
  getItemCount: (nameOrId: string | number) => number

  SellNPCStore: (sellItems: SellItem[]) => void
  BuyNPCStore: (buyItems: BuyItem[]) => void

  DropItem: (itemPos: number) => void
  UseItem: (itemPos: number) => void
}
