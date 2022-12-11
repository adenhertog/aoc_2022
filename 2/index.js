const fs = require('fs/promises')
const path = require('path')

const LOST = 0
const DRAW = 3
const WIN = 6

const TheirHand = {
  'A': 'Rock', // 1
  'B': 'Paper', // 2
  'C': 'Scissors' // 3
}

const OurHand = {
  'X': {
    name: 'lose',
    score: LOST,
    rank: (theirHand) => {
      switch (theirHand){
        case 'A': return 3
        case 'B': return 1
        case 'C': return 2
      }
    }
  },
  'Y': {
    name: 'draw',
    score: DRAW,
    rank: (theirHand) => {
      switch (theirHand){
        case 'A': return 1
        case 'B': return 2
        case 'C': return 3
      }
    }
  },
  'Z': {
    name: 'win',
    score: WIN,
    rank: (theirHand) => {
      switch (theirHand){
        case 'A': return 2
        case 'B': return 3
        case 'C': return 1
      }
    }
  }
}


const parse = async () => {
  const inputPath = path.join(__dirname, 'input')
  const input = await fs.readFile(inputPath, 'utf-8')

  const lines = input.trim().split('\n')
  const plays = lines.map(line => line.split(' '))
  const finalScore = plays.reduce((totalScore, [theirHand, ourHand]) => {
     const outcome = OurHand[ourHand].rank(theirHand)
     return totalScore + outcome + OurHand[ourHand].score
  }, 0)
  console.log({ finalScore })
}

parse()