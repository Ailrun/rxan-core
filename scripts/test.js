const fs = require('fs')
const path = require('path')
const process = require('process')

require('babel-register')
require('chai/register-expect')
const Mocha = require('mocha')

const mocha = new Mocha({
  ui: 'bdd',
})

const cwd = process.cwd()
const testsDir = path.join(cwd, 'tests')

const registerDir = (dir) => {
  const entries = fs.readdirSync(dir)
     .map((fileName) => path.join(dir, fileName))

  entries
    .filter((filePath) => filePath.match(/\.test\.js$/))
    .forEach((filePath) => mocha.addFile(filePath))

  entries
    .filter((filePath) => fs.statSync(filePath).isDirectory())
    .forEach(filePath => {
      registerDir(filePath)
    })
}

registerDir(testsDir)

global.requestAnimationFrame = () => {};
mocha.run((failures) => {
  process.on('exit', function () {
    process.exit(failures)
  })
})
