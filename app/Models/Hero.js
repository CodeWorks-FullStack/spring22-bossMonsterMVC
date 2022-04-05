export class Hero {
  // data will be the entire object that we will instantiate
  constructor(data) {
    this.name = data.name
    this.damage = data.damage
    this.health = data.health
    this.img = data.img
  }

  get Template() {
    return /*html*/ `
    <div class="col-md-6 text-center ${this.health <= 0 ? 'bg-danger' : ''}">
      <h1>${this.name}</h1>
      <img src="${this.img}" alt="">
      <div class="progress my-3">
        <div class="progress-bar" role="progressbar" style="width: ${this.health}%;" aria-valuenow="25" aria-valuemin="0"
          aria-valuemax="100"></div>
      </div>
      <button class="btn btn-success btn-lg" ${this.health <= 0 ? 'disabled' : ''} onclick="app.gameController.heal('${this.name}')">Heal</button>
    </div>
    `
  }
}