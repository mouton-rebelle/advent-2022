const message = require('fs').readFileSync('input.txt', 'utf8')

const checkForStartMarker = (str, pos, size) => {
  const slice = str.slice(Math.max(0, pos - size), pos)
  return new Set(slice.split('')).size === size
}

const getFirstMarker = (str, size) => {
  let cursor = 0

  while (!checkForStartMarker(str, cursor, size) && cursor < str.length) {
    cursor++
  }
  return cursor
}
console.log(getFirstMarker(message, 4))
console.log(getFirstMarker(message, 14))
