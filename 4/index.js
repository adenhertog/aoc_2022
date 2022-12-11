const fs = require('fs/promises')
const path = require('path')

const parse = async () => {
  const inputPath = path.join(__dirname, 'input')
  const input = await fs.readFile(inputPath, 'utf-8')
  const lines = input.split('\n')
  return lines
}

const overlaps = (lines) => {
  const assignments = lines.map(line => line.split(',').map(group => group.split('-').map(Number)))
  const contained = assignments.filter(([first, second]) => {
    const firstContainedBySecond = (first[0] >= second[0] && first[0] <= second[1]) || (first[1] >= second[0] && first[1] <= second[1])
    const secondContainedByFirst = (second[0] >= first[0] && second[0] <= first[1]) || ((second[1] >= first[0] && second[1] <= first[1]))
    return firstContainedBySecond || secondContainedByFirst
  })
  console.log(contained.length)
}

parse().then(overlaps)