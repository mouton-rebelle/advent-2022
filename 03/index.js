const getScoreForChar = char => {
  const ascii = char.charCodeAt(0)
  return ascii - (ascii > 96 ? 96 : 38)
}

if (getScoreForChar('b') !== 2) throw 'b === 2'
if (getScoreForChar('C') !== 29) throw 'C === 29'

const bags = require('fs')
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .map(items => {
    const compartimentA = items.slice(0, items.length / 2).split('')
    const compartimentB = items.slice(items.length / 2).split('')
    const common = compartimentA.filter(item => compartimentB.includes(item)).join('')
    return { common, score: getScoreForChar(common), items }
  })

console.log(bags.reduce((acc, bag) => acc + bag.score, 0))

// part 2

const groups = require('fs')
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .reduce((acc, elf) => {
    if (acc.length === 0 || acc[acc.length - 1].length === 3) {
      acc.push([])
    }
    acc[acc.length - 1].push(elf)
    return acc
  }, [])

console.log(
  groups
    .map(group => {
      return getScoreForChar(
        group
          .reduce(
            (acc, elf) =>
              acc.length === 0 ? elf.split('') : elf.split('').filter(item => acc.includes(item)),
            []
          )
          .join('')
      )
    })
    .reduce((acc, scoreForGroup) => acc + scoreForGroup, 0)
)
