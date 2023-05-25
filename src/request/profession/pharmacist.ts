import * as move from '../../move'
import * as npc from '../../npc'

export const incomingPharmacist = async () => {
  // 1.到里谢里亚堡内右边厨房内找料理长说话后就可以取得水果蕃茄 。
  await move.falan.toCastle()
  await move.walkList([
    [41, 50, '里谢里雅堡 1楼'],
    [103, 22, '里谢里雅堡厨房'],
  ])
  await npc.talkToNpc('料理长米其巴', npc.DefaultDialogStrategies.Confirm)

  // TODO:
  // 2.拿到蕃茄后再到法兰城东门外的山男之家[509.154]内和山男交谈后就可以和山男换取洛莫草。
  // 3.然后带著洛莫草到圣拉鲁卡村[135.219]内的医院找德拉格说话 交谈后就可以换取到药剂师推荐信。
  // 4.最后再到医院的二楼和药剂师柯尼说话后就可以就职
}
