import { ProxyState } from "../AppState.js";
import { gameService } from "../Services/GameService.js";

function _drawHeroes() {
  let template = ''
  ProxyState.heroes.forEach(h => template += h.Template)
  document.getElementById('heroes').innerHTML = template
}

function _drawBoss() {
  let template = ''
  ProxyState.bosses.forEach(b => template += b.Template)
  document.getElementById('boss').innerHTML = template
}

export class GameController {
  constructor() {
    console.log('hello from the game controller');
    // Proxystate.on is our event listener - first argument is the data we are watching in the ProxyState, second argument is the thing we want to run when the collection we 'subscribed' to changes
    // If you get an error that says 'Unable to register listener for ____", the first argument in the ProxyState.on doesn't match anything in ProxyState 
    ProxyState.on('bosses', _drawBoss)
    ProxyState.on('heroes', _drawHeroes)
    // NOTE if we want something to happen immediately when this controller is loaded, put it here!
    _drawHeroes()
  }

  attackBoss(bossName) {
    gameService.attackBoss(bossName)
  }

  heal(heroName) {
    gameService.heal(heroName)
  }

  createBoss() {
    window.event.preventDefault()
    console.log('create BAWSSSZZZZ');
    let form = window.event.target
    let newBoss = {
      // @ts-ignore
      name: form.name.value,
      // @ts-ignore
      img: form.img.value
    }
    // @ts-ignore
    form.reset()
    console.log('new boss in controller', newBoss);
    gameService.createBoss(newBoss)
  }
}