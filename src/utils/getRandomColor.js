function getRand() {
  return Math.floor(Math.random() * 255);
}

export function getRandomColor() {
  return `rgb(${getRand()},${getRand()},${getRand()})`;
}
