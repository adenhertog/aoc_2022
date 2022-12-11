const fs = require('fs/promises')
const path = require('path')

const parse = async () => {
  const inputPath = path.join(__dirname, 'input')
  const input = await fs.readFile(inputPath, 'utf-8')
  const lines = input.split('\n')
  return lines
}

const START_OF_PACKET = 4
const START_OF_MESSAGE = 14

const findStart = (numUnique) => (lines) => {
  const positions = lines.map(line => {
    let buffer = []
    let position = 0
    for (position = 0; position < line.length; position++) {
      buffer.push(line[position])
      if (buffer.length > numUnique) {
        buffer.shift()
      }
      
      // Much easier to just use a Set here instead
      if (buffer.length === numUnique) {
        // Check all unique
        let hasDupe = false
        for (let j = 0; j < buffer.length - 1 && !hasDupe; j++) {

          hasDupe = hasDupe || buffer.slice(j + 1).some(after => buffer[j] === after)
        }
        if (!hasDupe) {
          break
        }
      }
    }

    return position
  }).map(i => i + 1)

  return positions
}

// 7 5 6 10 11
parse().then(findStart(START_OF_MESSAGE)).then(console.log)