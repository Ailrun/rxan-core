const path = require('path')
const process = require('process')
const util = require('util')

const babelrc = require('babelrc-rollup').default
const chalk = require('chalk')
const rimraf = require('rimraf')
const { rollup } = require('rollup')
const babel = require('rollup-plugin-babel')
const { terser } = require('rollup-plugin-terser')

const pkg = require('../package.json')

const cwd = process.cwd()

const removeBuilt = async () => {
  const builtDirectory = path.dirname(path.join(cwd, pkg.main))
  console.log(chalk.red(`... Remove './${path.relative(cwd, builtDirectory)}'\n`))
  await util.promisify(rimraf)(builtDirectory)
  console.log(chalk.red(`'./${path.relative(cwd, builtDirectory)}' is removed successfully\n`))
}

const external = (id) => {
  const {
    dependencies: deps,
    peerDependencies: pDeps,
  } = pkg

  const staticExternals =
    Object.keys(deps ? deps : {})
      .concat(Object.keys(pDeps ? pDeps : {}))

  return staticExternals
    .includes(id.split('/')[0])
}

const inputOptions = {
  common: {
    input: 'src/index.js',
    external,
  },
  dev: {
    plugins: [
      babel(babelrc()),
    ],
  },
  prod: {
    plugins: [
      babel(babelrc()),
      terser(),
    ],
  },
}

const globals = {
  'rxjs': 'rxjs',
  'rxjs/operators': 'rxjs.operators',
}

const buildDev = async () => {
  const bundle = await rollup({
    ...inputOptions.common,
    ...inputOptions.dev,
  })

  // Write cjs.js
  await bundle.write({
    file: pkg.main,
    format: 'cjs',
    globals,
    sourcemap: true,
  })
  // Write umd.js
  await bundle.write({
    file: pkg.browser,
    format: 'umd',
    globals,
    name: 'rxan.core',
    sourcemap: true,
  })
  // Write esm.js
  await bundle.write({
    file: pkg.module,
    format: 'es',
    globals,
    sourcemap: true,
  })
}

const toMinPath = (path) => path.replace(/\.js$/, '.min.js')

const buildProd = async () => {
  const bundle = await rollup({
    ...inputOptions.common,
    ...inputOptions.prod,
  })

  const minPath = {
    main: toMinPath(pkg.main),
    browser: toMinPath(pkg.browser),
    module: toMinPath(pkg.module),
  }

  // Write cjs.min.js
  await bundle.write({
    file: toMinPath(pkg.main),
    format: 'cjs',
    globals,
    sourcemap: true,
  })
  // Write umd.min.js
  await bundle.write({
    file: toMinPath(pkg.browser),
    format: 'umd',
    globals,
    name: 'rxan.core',
    sourcemap: true,
  })
  // Write esm.min.js
  await bundle.write({
    file: toMinPath(pkg.module),
    format: 'es',
    globals,
    sourcemap: true,
  })
}

const build = async () => {
  await removeBuilt()
  await Promise.all([
    buildDev(),
    buildProd(),
  ])
}

build()
  .then(() => {
    console.log(chalk.green('\n\nbuilding is successfully finished'))
  })
  .catch((error) => {
    console.error(chalk.red(error))
    process.exit(1)
  })
