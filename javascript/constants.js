var w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  x = w.innerWidth || e.clientWidth || g.clientWidth,
  y = w.innerHeight || e.clientHeight || g.clientHeight;

let SQUARE_SIZE = Math.floor((y - 200) / 10);
let SPEED = SQUARE_SIZE;
const DIRECTIONS = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};
let END_TEXT = "GAME OVER"

function GenerateRandomDirection() {
  let randomNo = Math.floor(Math.random() * 4) + 37;
  return DIRECTIONS[randomNo];
}

function ShuffleArray(arr) {
  return arr.sort(() => 0.5 - Math.random());
}