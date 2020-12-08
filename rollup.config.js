import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        name: 'WebTour',
        file: 'dist/webtour.js',
        format: 'iife',
        sourcemap: 'inline',        
    },
    plugins: [
        resolve(),
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
          extensions: ['.js'],
        })
      ],
  };