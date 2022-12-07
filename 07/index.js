const lines = require('fs').readFileSync('listing.txt', 'utf8').split('\n')

let fs = []
let current = ''
lines
  .filter(line => line !== '$ ls' && line.slice(0, 4) !== 'dir ' && line !== 'cd /')
  .forEach(line => {
    if (line.slice(0, 5) === '$ cd ') {
      const dir = line.slice(5)
      if (dir === '..') {
        current = current.slice(0, current.lastIndexOf('/'))
        if (current === '') current = '/'
      } else {
        current = current + (current.slice(-1) !== '/' && dir !== '/' ? '/' : '') + dir
      }
      if (!fs.find(f => f.path === current)) {
        fs.push({
          path: current,
          isDir: true,
          size: 0
        })
      }
    } else {
      const [size, name] = line.split(' ')
      fs.push({
        path: (current === '/' ? '/' : current + '/') + name,
        isDir: false,
        size: parseInt(size)
      })
    }
  })

const findDirectory = path => fs.find(f => f.isDir && f.path === path)

fs.filter(({ isDir }) => !isDir).forEach(file => {
  fs[0].size += file.size
  let dirPath = file.path.slice(0, file.path.lastIndexOf('/'))
  while (dirPath !== '') {
    const dir = findDirectory(dirPath)
    dir.size += file.size
    dirPath = dirPath.slice(0, dirPath.slice(0, dirPath.length - 1).lastIndexOf('/'))
  }
})

fs.sort((a, b) => (a.path > b.path ? 1 : -1)).forEach(line => {
  console.log((line.isDir ? 'D ' : 'F ') + line.path.padEnd(90) + line.size)
})

const smallDir = fs.filter(p => p.isDir && p.size < 100000)
console.log(smallDir.reduce((acc, { size }) => acc + size, 0))
// part 2
const DISK = 70000000
const NEEDED = 30000000
const free = DISK - fs[0].size
const toDelete = NEEDED - free

console.log(free, toDelete)

console.log(
  fs.filter(p => p.isDir && p.size >= toDelete).sort((a, b) => (a.size > b.size ? 1 : -1))
)
