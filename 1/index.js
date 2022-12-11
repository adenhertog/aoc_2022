const fs = require('fs/promises')
const path = require('path')

const parse = async () => {
  const inputPath = path.join(__dirname, 'input')
  const input = await fs.readFile(inputPath, 'utf-8')

  const elves = []
  let elf = 0
  const lines = input.split('\n')
  for (const line of lines) {
    if (line === '' || isNaN(Number(line))) {
      elves.push(elf)
      elf = 0
    } else {
      const calories = Number(line)
      console.log(line, calories)
      elf += calories
    }
  }
  elves.push(elf)
  const top3 = elves.sort().reverse().slice(0, 3)
  console.log(top3.reduce((acc, curr) => acc + curr, 0))
}

parse()