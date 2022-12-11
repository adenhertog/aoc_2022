const fs = require('fs/promises')
const path = require('path')

const lowerCase = Object.fromEntries(new Array(26)
  .fill(undefined)
  .map((_, i) => [String.fromCharCode('a'.charCodeAt(0) + i), i + 1]))

const upperCase = Object.fromEntries(new Array(26)
  .fill(undefined)
  .map((_, i) => [String.fromCharCode('A'.charCodeAt(0) + i), i + 27]))

const scores = {
  ...lowerCase,
  ...upperCase
}

const parse = async () => {
  const inputPath = path.join(__dirname, 'input')
  const input = await fs.readFile(inputPath, 'utf-8')
  const lines = input.split('\n')
  return lines
}

const priorities = (lines) => {
  const groups = []
  let currentGroup = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (i % 3 === 0) {
      currentGroup.length && groups.push(currentGroup)
      currentGroup = [line]
    } else { 
      currentGroup.push(line)
    }
  }
  groups.push(currentGroup)

  const groupChars = groups.map(([first, second, third]) => {
    const items = first.split('').filter(char => second.includes(char) && third.includes(char))
    const [char] = items
    console.log(items)
    return char
  })
    .map(char => scores[char])
    .reduce((acc, curr) => acc + curr, 0)
  console.log(groupChars)
}

const calcSums = (lines) => {

  const duplicates = lines.map(line => {
    const firstHalf = line.slice(0, line.length / 2)
    const secondHalf = line.slice(line.length / 2)

    const repeats = firstHalf.split('').filter(char => secondHalf.includes(char))[0]
    // console.log(repeats, secondHalf)
    return scores[repeats]
  })

  const sum = duplicates.reduce((acc, curr) => acc + curr, 0)
  console.log(sum)
}

parse().then(priorities)