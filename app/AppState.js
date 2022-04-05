import { Hero } from "./Models/Hero.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

// Extends means INHERITANCE - Basically Appstate is a class that includes everything in EventEmitter AND whatever else we put inside of the AppState class
class AppState extends EventEmitter {

  money = 0

  bosses = []

  // NOTE Creating test data
  heroes = [new Hero({ name: 'Sir Harrington', damage: 1.5, health: 75, img: "https://miro.medium.com/max/900/0*MKa98bYfic-q7waG." }), new Hero({ name: "Sir Markington", damage: 10, health: 100, img: "https://codeworks.blob.core.windows.net/media/mark.ohnsman__QGdtYWlsLmNvbQ==/profile-picture.jpeg?v=761" })]
}

// This is a proxy object - so, when things change inside of this proxy object, lets tell people that are 'subscribed' that something changed. Also known as the observer pattern.
// ProxyState is a WRAPPER for our Appstate and is the "bouncer" or Zach. We don't allow direct manipulation of the AppState - we have to go through the ProxyState proxy object and it will perform the changes for us.
export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
