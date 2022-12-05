const elfOverlap = (a, b) =>
  (a.min <= b.min && a.max >= b.min) || (a.max >= b.max && a.min <= b.max)

const pairs = require('fs')
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(rawPair =>
    rawPair
      .split(',')
      .map(elf => elf.split('-').map(Number))
      .map(([min, max]) => {
        return { min, max }
      })
  )
  .map(([a, b]) => {
    const fullOverlap = (a.min <= b.min && a.max >= b.max) || (a.min >= b.min && a.max <= b.max)
    return {
      a,
      b,
      fullOverlap,
      partialOverlap: elfOverlap(a, b) || elfOverlap(b, a) || fullOverlap
    }
  })

console.log({ part1: pairs.reduce((acc, pair) => (pair.fullOverlap ? acc + 1 : acc), 0) })
console.log({ part2: pairs.filter(pair => pair.partialOverlap).length })

// part 2
