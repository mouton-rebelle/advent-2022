const data = require('fs').readFileSync('calories.txt', 'utf8');
const elves = data.split('\n\n').map(elf => elf.split('\n').reduce((acc, curr) => acc + parseInt(curr), 0));
console.log(Math.max(...elves))