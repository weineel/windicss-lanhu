import ts from 'rollup-plugin-ts'
import copy from 'rollup-plugin-copy'
import Pkg from './package.json'

const pluginName = Pkg.name

export default {
  input: 'src/index.ts',
  output: {
    file: `${pluginName}/bundle.js`,
    format: 'umd'
  },
  plugins: [
    ts({
      /* Plugin options */
    }),
    copy({
      targets: [
        { src: 'manifest.json', dest: `${pluginName}/` },
      ]
    }),
  ]
};
