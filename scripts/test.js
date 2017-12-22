const fs = require('fs')
const path = require('path')
const process = require('process')

require('babel-register')
require('chai/register-expect')
const Mocha = require('mocha')

const mocha = new Mocha({
  ui: 'bdd',
  reporter: 'landing',
})

const cwd = process.cwd()
const testsDir = path.join(cwd, 'tests')

fs.readdirSync(testsDir)
  .filter((file) => file.match(/\.test\.js$/))
  .forEach((file) => mocha.addFile(path.join(testsDir, file)))

mocha.run((failures) => {
  process.on('exit', function () {
    process.exit(failures)
  })
})
