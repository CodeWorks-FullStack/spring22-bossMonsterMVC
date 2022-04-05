import { GameController } from "./Controllers/GameController.js";

class App {
  // NOTE ***if you want to get rid of the boilerplate code drawing to the page by default, just remove the valuesController instantiation and import***
  gameController = new GameController()
}

window["app"] = new App();
