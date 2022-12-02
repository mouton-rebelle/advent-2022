// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
const moveMap = {
  A: 'R',
  X: 'R',
  B: 'P',
  Y: 'P',
  C: 'S',
  Z: 'S'
}
// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
const resultMap = {
  X: 0,
  Y: 3,
  Z: 6
}

const movePointMap = {
  R: 1,
  P: 2,
  S: 3
}
// 0 if you lost, 3 if the round was a draw, and 6 if you won
const roundState = (opMove, myMove) => {
  if (opMove === myMove) {
    return 3
  }
  switch (myMove) {
    case 'R':
      return opMove === 'S' ? 6 : 0
    case 'P':
      return opMove === 'R' ? 6 : 0
    case 'S':
      return opMove === 'P' ? 6 : 0
  }
}
const guessMyMove = (opMove, expectedResult) => {
  switch (expectedResult) {
    case 0:
      return opMove === 'S' ? 'P' : opMove === 'R' ? 'S' : 'R'
    case 6:
      return opMove === 'S' ? 'R' : opMove === 'R' ? 'P' : 'S'
    default:
      return opMove
  }
}
const rounds = require('fs')
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(r => r.split(' '))

const pointPerRoundsPart1 = rounds.map(([opMove, myMove]) => {
  return {
    opMove: moveMap[opMove],
    myMove: moveMap[myMove],
    score: roundState(moveMap[opMove], moveMap[myMove]) + movePointMap[moveMap[myMove]]
  }
})
const totalPart1 = pointPerRoundsPart1.reduce((acc, curr) => acc + curr.score, 0)

const pointPerRoundsPart2 = rounds.map(([opMove, expected]) => {
  return {
    opMove: moveMap[opMove],
    weWant: resultMap[expected],
    myMove: guessMyMove(moveMap[opMove], resultMap[expected]),
    score: movePointMap[guessMyMove(moveMap[opMove], resultMap[expected])] + resultMap[expected]
  }
})
const totalPart2 = pointPerRoundsPart2.reduce((acc, curr) => acc + curr.score, 0)
console.log(totalPart2)
console.log(pointPerRoundsPart2)
// console.log(rounds)
