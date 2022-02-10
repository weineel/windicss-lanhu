import ts from 'rollup-plugin-ts'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'umd'
  },
  plugins: [
		ts({
			/* Plugin options */
		})
	]
};
