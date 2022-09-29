import { ServerUtils } from "@project-error/pe-utils";
import dispatchService from './dispatch.service'

export const Utils = new ServerUtils();
const exp = global.exports

RegisterCommand("dispatchduty", (src: number) => {
  if (!dispatchService.isPlayerDispatcher(src)) {
    dispatchService.newDispatcher(src)
    emitNet("npwd-dispatch:notify", src, "You are now ~g~on~s~ duty as a dispatcher")
  } else {
    dispatchService.removeDispatcher(src)
    emitNet("npwd-dispatch:notify", src, "You are now ~r~off~s~ duty as a dispatcher")
  }
}, true)

on('playerDropped', () => {
  const src = global.source
  if (dispatchService.isPlayerDispatcher(src)) {
    dispatchService.removeDispatcher(src)
  }
})

const emergencyNumber = GetConvar('npwd_dispatch_number', '911')

exp.npwd.onCall(emergencyNumber, async (ctx: OnCallExportCtx) => {
  const dispatcher = await dispatchService.getFirstAvailable(ctx.incomingCaller.source)
  if(!dispatcher) {
    ctx.reply("Sorry, there are no operators able to handle this call right now.")
    return ctx.exit()
  }

  ctx.forward(dispatcher)
})

exp.npwd.onMessage(emergencyNumber, async (ctx: OnMessageExportCtx) => {
  const { phoneNumber } = await exports.npwd.getPlayerData({ source: ctx.source })
  const dispatchers = dispatchService.getAll().filter(val => val.number !== phoneNumber)

  if (!dispatchers || !dispatchers.length) {
    return exp.npwd.emitMessage({
      senderNumber: emergencyNumber,
      targetNumber: phoneNumber,
      message: "Sorry, there are no operators able to handle this request right now."
    })
  }

  const coords = GetEntityCoords(GetPlayerPed(ctx.source.toString()))

  dispatchers.forEach(({number}) => {
    exp.npwd.emitMessage({
      senderNumber: emergencyNumber,
      targetNumber: number,
      message: ctx.data.message,
      embed: {
        type: "location",
        coords,
        phoneNumber: phoneNumber
      }
    })
  })
})
