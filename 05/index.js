const [schema, instructions] = require('fs').readFileSync('input.txt', 'utf8').split('\n\n')
let cargo = Array.from({ length: 10 })
  .fill()
  .map(() => [])
const lines = schema.split('\n')

lines
  .splice(0, lines.length - 1)
  .reverse()
  .forEach(line => {
    let cursor = 0
    let pos = 1
    while (cursor < line.length && pos < 10) {
      if (line.substring(cursor, cursor + 1) === '[') {
        cargo[pos].push(line.substring(cursor + 1, cursor + 2))
      }
      cursor = cursor + 4
      pos++
    }
  })

const inst = instructions.split('\n').map(line => {
  const [a, b] = line.split(' from ')
  const nb = parseInt(a.split(' ')[1])
  const [from, to] = b.split(' to ')
  return {
    nb,
    from: parseInt(from),
    to: parseInt(to)
  }
})
/* part one
// flatten instruction
let flat = []
inst.forEach(({ nb, from, to }) => {
  for (let i = 0; i < nb; i++) {
    flat.push({ from, to })
  }
})

// run instructions
flat.forEach(({ from, to }) => {
  const crate = cargo[from].pop()
  if (crate) {
    cargo[to].push(crate)
  } else {
    throw { from, to, cargo }
  }
})
*/

inst.forEach(({ nb, from, to }) => {
  const crates = cargo[from].splice(-nb)
  console.log(crates)
  cargo[to].push(...crates)
})
console.log(cargo.map(col => (col.length ? col[col.length - 1] : '')).join(''))
