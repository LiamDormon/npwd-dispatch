import { ClientUtils } from "@project-error/pe-utils"

const Utils = new ClientUtils()

Utils.registerRPCListener('npwd-dispatch:isInCall', () => {
  return global.exports.npwd.isInCall()
})

onNet("npwd-dispatch:notify", (text: string) => {
  BeginTextCommandThefeedPost("STRING")
  AddTextComponentSubstringPlayerName(text)
  EndTextCommandThefeedPostTicker(false, false)
})