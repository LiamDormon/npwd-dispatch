import {Utils} from "./server";

class DispatchService {
  private dispatchers: Map<number, Dispatcher>;

  constructor() {
    this.dispatchers = new Map();
  }

  public isPlayerDispatcher(src: number): boolean {
    return this.dispatchers.has(src)
  }

  public async newDispatcher(src: number): Promise<void> {
    const { phoneNumber } = await exports.npwd.getPlayerData({ source: src })
    this.dispatchers.set(src, {
      src,
      number: phoneNumber
    })
  }

  public removeDispatcher(src: number): void {
    this.dispatchers.delete(src)
  }

  public async getFirstAvailable(source: number): Promise<string | null> {
    const promises: Promise<string>[] = []
    this.dispatchers.forEach( ({src, number}) => {
      promises.push(
        new Promise(async (resolve) => {
          const isBusy = await Utils.callClientRPC<boolean>("npwd-dispatch:isInCall", src)
          const ping = GetPlayerPing(src.toString())
          if (!isBusy && ping > 0 && source !== src) {
            resolve(number)
          }
        })
      )
    })

    await Promise.all(promises)
    return promises[0] || null
  }

  public getAll(): Dispatcher[] {
    const arr: Dispatcher[] = []
    this.dispatchers.forEach((dispatcher) => arr.push(dispatcher))
    return arr
  }
}

export default new DispatchService()