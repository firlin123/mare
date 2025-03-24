import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'

export default {
  input: 'src/_worker.mjs',
  output: {
    exports: 'named',
    format: 'es',
    file: 'dist/_worker.js',
    sourcemap: false,
  },
  plugins: [
    commonjs(),
    nodeResolve({ browser: true }),
    terser(),
    copy({
      targets: [{ src: './static/*', dest: './dist/' }],
    }),
  ],
}
