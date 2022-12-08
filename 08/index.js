const { isDate } = require('util/types')

const forest = require('fs')
  .readFileSync('forest.txt', 'utf8')
  .split('\n')
  .map(line => line.split('').map(Number))

// console.log(forest)
const width = forest[0].length
const height = forest.length
const edgeTrees = width * 2 + (height - 2) * 2

let visibleTrees = edgeTrees

// A tree is visible if all of the other trees between it and an edge of the grid are shorter than it.
// will be called with value between 1 & 97
const isTreeVisible = (x, y) => {
  const elevation = forest[y][x]
  const maxLeft = Math.max(...forest[y].slice(0, x))
  const maxRight = Math.max(...forest[y].slice(x + 1))
  const maxTop = Math.max(...forest.slice(0, y).map(col => col[x]))
  const maxBottom = Math.max(...forest.slice(y + 1).map(col => col[x]))
  const visibleFromLeft = maxLeft < elevation
  const visibleFromRight = maxRight < elevation
  const visibileFromTop = maxTop < elevation
  const visibileFromBottom = maxBottom < elevation
  return visibileFromBottom || visibileFromTop || visibleFromLeft || visibleFromRight
}

forest.forEach((row, y) => {
  row.forEach((tree, x) => {
    if (x > 0 && x < width - 1) {
      if (y > 0 && y < height - 1) {
        if (isTreeVisible(x, y)) visibleTrees++
      }
    }
  })
})

console.log('part1', width, height, visibleTrees)

const getNbTreeVisible = (elevation, arr) => {
  let index = 0
  let viewBlocked = false
  while (!viewBlocked && index < arr.length) {
    if (arr[index] >= elevation) viewBlocked = true
    index++
  }
  return index
}

const getScenicScore = (x, y) => {
  const elevation = forest[y][x]
  const left = getNbTreeVisible(elevation, forest[y].slice(0, x).reverse())
  const right = getNbTreeVisible(elevation, forest[y].slice(x + 1))
  const top = getNbTreeVisible(
    elevation,
    forest
      .slice(0, y)
      .map(col => col[x])
      .reverse()
  )
  const bottom = getNbTreeVisible(
    elevation,
    forest.slice(y + 1).map(col => col[x])
  )
  console.log(
    left * right * top * bottom,
    'scenic score',
    x,
    y,
    elevation,
    left,
    right,
    top,
    bottom
  )
  return left * right * top * bottom
}

let maxScore = 0
forest.forEach((row, y) => {
  row.forEach((tree, x) => {
    const score = getScenicScore(x, y)
    if (score > maxScore) maxScore = score
  })
})
console.log(maxScore)
