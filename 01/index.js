const data = require('fs').readFileSync('calories.txt', 'utf8')

const elves = data
  .split('\n\n')
  .map(elf => elf.split('\n').reduce((acc, curr) => acc + parseInt(curr), 0))
  .sort((a, b) => (a < b ? 1 : -1))

const top3 = elves.slice(0, 3)

const caloriesTop3 = top3.reduce((acc, curr) => acc + curr, 0)
console.log(top3, caloriesTop3)

console.log(Math.max(...elves))
