export class Boss {
  constructor(data) {
    this.name = data.name
    this.health = 100
    this.damage = Math.floor(Math.random() * 35)
    // This || statement is setting a default is nothing was supplied during instantiation 
    this.img = data.img || 'https://thiscatdoesnotexist.com'
  }

  get Template() {
    return /*html*/ `
    <div class="row my-2">
      <div class="col-12 text-center">
        <h1>${this.name}</h1>
        <img src="${this.img}"
          alt="">
        <div class="progress my-3">
          <div class="progress-bar" role="progressbar" style="width: ${this.health}%;" aria-valuenow="25" aria-valuemin="0"
            aria-valuemax="100"></div>
        </div>
        <button class="btn btn-danger" onclick="app.gameController.attackBoss('${this.name}')">ATTACK</button>
      </div>
    </div>
    `
  }
}