import babelrc from 'babelrc-rollup'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const pkg = require('./package.json')
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
const globals = {
  'rxjs': 'Rx',
  'rxjs/Observable': 'Rx.Observable',
}

const pluginsDev = [
  babel(babelrc()),
]

const pluginsProd = pluginsDev.concat([
  uglify({}, minify),
])

export default [{
  input: 'src/index.js',
  plugins: pluginsDev,
  external,
  globals,
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'rxan.core',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ]
}, {
  input: 'src/index.js',
  plugins: pluginsProd,
  external,
  globals,
  output: [
    {
      file: pkg['main:min'],
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg['browser:min'],
      format: 'umd',
      name: 'rxan.core',
      sourcemap: true
    },
    {
      file: pkg['module:min'],
      format: 'es',
      sourcemap: true
    }
  ]
}]
