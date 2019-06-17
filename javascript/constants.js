
// class State {
//   constructor(level, actors, status) {
//     this.level = level;
//     this.actors = actors;
//     this.status = status;
//   }

//   static start(level) {
//     return new State(level, level.startActors, "playing");
//   }

//   get player() {
//     return this.actors.find(a => a.type == "player");
//   }
// }

class Player {
  constructor(posX, posY, speed) {
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
  }

  get type() { return "player"; }

  move(direction) {
    let squareX = Math.ceil(this.posX / 40);
    let squareY = Math.ceil(this.posY / 40);
    switch (direction) {
      case "right":
        squareX = Math.floor((this.posX + SQUARE_SIZE) / 40);
        if (canMove(squareX, squareY)) this.posX = this.posX += SPEED;
        break;
      case "left":
        squareX = Math.ceil((this.posX - SQUARE_SIZE) / 40);
        if (canMove(squareX, squareY)) this.posX = this.posX -= SPEED;
        break;
      case "up":
        squareY = Math.ceil((this.posY - SQUARE_SIZE) / 40);
        if (canMove(squareX, squareY)) this.posY = this.posY -= SPEED;
        break;
      case "down":
        squareY = Math.floor((this.posY + SQUARE_SIZE) / 40);
        if (canMove(squareX, squareY)) this.posY = this.posY += SPEED;
        break;
      default:
        break;
    }

    function canMove(squarex, squarey) {
      return (CURRENT_GAME.level.rows[squarey][squarex] !== "wall");
    }
  }
}



