const SQUARE_SIZE = 40;
const SPEED = 40;
const DIRECTIONS = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

function GenerateRandomDirection() {
  let randomNo = Math.floor(Math.random() * 4) + 37;
  return DIRECTIONS[randomNo];
}