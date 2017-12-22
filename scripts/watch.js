const fs = require('fs')
const path = require('path')
const process = require('process')

require('babel-register')
require('chai/register-expect')
const Gaze = require('gaze').Gaze
const Mocha = require('mocha')

const cwd = process.cwd()
const testsDir = path.join(cwd, 'tests')

const createMocha = (watcher) => {
  const mocha = new Mocha({
    ui: 'bdd',
    reporter: 'landing',
  })

  const fileMaps = watcher.watched()
  const directories = Object.keys(fileMaps)
  const files = directories
    .reduce((acc, directory) => [...acc, ...fileMaps[directory]], [])
    .filter((filePath) => fs.statSync(filePath).isFile())
  files.forEach((file) => {
    delete require.cache[file]
    mocha.files.push(file)
  })

  return mocha
}

const gaze = new Gaze(path.join(testsDir, '**', '*.test.js'))

gaze.on('ready', () => {
  const mocha = createMocha(gaze)
  mocha.run()
})

gaze.on('added', (filePath) => {
  const mocha = createMocha(gaze)
  mocha.run()
})

gaze.on('changed', (filePath) => {
  const mocha = createMocha(gaze)
  mocha.run()
})

gaze.on('deleted', (filePath) => {
  const mocha = createMocha(gaze)
  mocha.run()
})

gaze.on('renamed', (newPath, oldPath) => {
  const mocha = createMocha(gaze)
  mocha.run()
})

gaze.on('error', (error) => {
  console.error(error)
})
