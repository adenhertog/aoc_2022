const fs = require('fs/promises')
const path = require('path')

let STACK = []

const parseStack = async () => {
  const inputPath = path.join(__dirname, 'input')
  const input = await fs.readFile(inputPath, 'utf-8')
  // Double line break delimits the stack from the instructions
  const stackStr = input.split('\n\n')[0].split('\n')

  // The x-axis labels
  const footer = stackStr.pop()
  // The stacks are evenly spaced at 3 characters each, with a space of 1 character between them
  const numBuckets = Math.ceil(footer.length / 4)

  const stack = new Array(numBuckets).fill(undefined).map(() => [])

  // Convert the stack diagram to a 2d array
  while (stackStr.length) {
    const row = stackStr.pop()
    for (let i = 1; i < row.length; i += 4) {
      const col = (i - 1) / 4
      const item = row[i]
      if (/[A-Z]/.test(item)) {
        stack[col].push(item)
      }
    }
  }

  const instructions = input.split('\n\n')[1].split('\n')
  return { instructions, stack }
}


const moves = (lines) => {
  const instructions = lines.map(line => {
    return /move (?<quantity>\d+) from (?<from>\d+) to (?<to>\d+)/.exec(line).groups
  }).map(({ quantity, from, to}) => ({ quantity: Number(quantity), from: Number(from), to: Number(to)}))

  instructions.forEach(({ quantity, from, to }) => {
    // Cranepicker 9001
    const picked = STACK[from - 1].splice(STACK[from - 1].length - quantity, quantity)
    STACK[to - 1].push(...picked)

    // Cranepicker 9000
    // for (let i = 0; i < quantity; i++) {
    //   const element = STACK[from - 1].pop()
    //   STACK[to - 1].push(element)
    // }
  })

  const result = STACK.map(item => item.pop()).join('')
  console.log(result)
}

parseStack().then(moves)//.then(() => parse(5)).then(moves)