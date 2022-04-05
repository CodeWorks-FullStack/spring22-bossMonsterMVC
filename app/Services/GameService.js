import { ProxyState } from "../AppState.js"
import { Boss } from "../Models/Boss.js"
import { Pop } from "../Utils/Pop.js"

let intervalId
class GameService {
  heal(heroName) {
    let foundHero = ProxyState.heroes.find(h => h.name == heroName)
    // if he dies, he dies
    if (foundHero.name !== "Sir Harrington") {
      foundHero.health += Math.floor(Math.random() * 10)
    }

    ProxyState.heroes = ProxyState.heroes
  }
  attackBoss(bossName) {
    let foundBoss = ProxyState.bosses.find(b => b.name == bossName)
    if (foundBoss.health > 0) {
      ProxyState.heroes.forEach(h => foundBoss.health -= h.damage)
      console.log(foundBoss.health);
    }
    if (foundBoss.health <= 0) {
      Pop.toast(`${foundBoss.name} has been slain!!! Much rejoicing`)
      let bossIndex = ProxyState.bosses.findIndex(b => b.name == bossName)
      ProxyState.bosses.splice(bossIndex, 1)
      clearInterval(intervalId)
    }
    ProxyState.bosses = ProxyState.bosses
  }


  createBoss(newBoss) {
    // This is one way to trigger the listener
    // ProxyState.bosses.push(new Boss(newBoss))
    // ProxyState.bosses = ProxyState.bosses

    // NOTE this is RESETTING the array in our proxystate, which our listener will be able to pick up on an draw
    ProxyState.bosses = [new Boss(newBoss), ...ProxyState.bosses]
    intervalId = setInterval(this.attackHeroes, 1000)
    console.log(ProxyState.bosses);
  }
  attackHeroes() {
    let randomPlayer = ProxyState.heroes[Math.floor(Math.random() * ProxyState.heroes.length)]
    if (randomPlayer.health <= 0) {
      clearInterval(intervalId)
    }
    ProxyState.bosses.forEach(b => randomPlayer.health -= b.damage)
    ProxyState.heroes = ProxyState.heroes
  }

}

// Singleton pattern
export const gameService = new GameService()