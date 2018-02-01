import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV

const config = {
	entry: './src/index.js',
	external: ['react', 'prop-types'],
	format: 'umd',
	globals: {
		react: 'React',
		"prop-types": 'PropTypes',
	},
	dest: './lib/ytTable.js',
	moduleName: 'ytTable',
	plugins: [
		// less(),
		postcss({
            // extract: true,
			plugins: [],
		}),
		babel({
            exclude: '**/node_modules/**',
            plugins: ['external-helpers']
		}),
		commonjs(),
	],
}

if (env === 'production') {
	config.plugins.push(
		uglify({
			compress: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				warnings: false,
			},
		})
	)
}

export default config
