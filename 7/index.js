const fsp = require('fs/promises')
const path = require('path')

const parse = async () => {
  const inputPath = path.join(__dirname, 'input')
  const input = await fsp.readFile(inputPath, 'utf-8')
  const commands = input.split('$')
    .map(group => group.trim())
    .filter(group => group)
  return commands
}

class File {
  constructor (name, size) {
    this.name = name,
    this.size = size
  }
}

class Directory extends File {
  items = []

  constructor (name, size, parent) {
    super(name, size)
    this.parent = parent
  }

  push (item) {
    this.items.push(item)

    let ancestor = this
    do {
      ancestor.size += item.size
    } while (ancestor = ancestor.parent)
  }
}

const cdRegex = /cd (?<directory>.*)/
const dirRegex = /dir (?<name>.*)/
const fileRegex = /(?<size>\d+) (?<name>.*)/

const runCommands = (groups) => {
  const root = new Directory('/', 0)
  currentDir = root

  groups
    .slice(1)
    .forEach(group => {
      const groupSplit = group.split('\n')
      const [command, ...output] = groupSplit

      if (command === 'ls') {
        output.forEach(element => {
          if (dirRegex.test(element)) {
            const { name } = dirRegex.exec(element).groups
            const dir = new Directory(name, 0, currentDir)
            currentDir.push(dir)
          } else {
            const { size, name } = fileRegex.exec(element).groups
            const file = new File(name, Number(size))
            currentDir.push(file)
          }
        })
      // cd 
      } else {
        const { directory } = cdRegex.exec(command).groups
        if (directory === '..') {
          currentDir = currentDir.parent
        } else {
          currentDir = currentDir.items.find(item => item.name === directory)
        }
      }
    })
  return root
}

const findDirWithSizeLessThan = (limit) => (root) => {
  const matchingDirs = []

  const findAndAdd = (dir) => {
    if (dir.size <= limit) {
      matchingDirs.push(dir)
    }
    dir.items
      .filter(item => item instanceof Directory)
      .forEach(findAndAdd)
  }
  findAndAdd(root)
  return matchingDirs
}

const findDirWithSizeMoreThan = (limit) => (root) => {
  const matchingDirs = []

  const findAndAdd = (dir) => {
    if (dir.size >= limit) {
      matchingDirs.push(dir)
    }
    dir.items
      .filter(item => item instanceof Directory)
      .forEach(findAndAdd)
  }
  findAndAdd(root)
  return matchingDirs
}

const findDirToDelete = (root) => {
  const totalDiskSpace = 70000000
  const targetUnusedSpace = 30000000

  const spaceUsed = totalDiskSpace - root.size
  const spaceNeeded = targetUnusedSpace - spaceUsed

  const candidateDirs = findDirWithSizeMoreThan(spaceNeeded)(root)
  return candidateDirs.sort((a, b) => a.size - b.size).shift().size
}


parse()
  .then(runCommands)
  // .then(findDirWithSizeLessThan(100000))
  // .then(dirs => dirs.map(dir => dir.size).reduce((prev, curr) => prev + curr, 0))
  .then(findDirToDelete)
  .then(console.log)