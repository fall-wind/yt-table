import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import eslint from 'rollup-plugin-eslint';
// import less from 'rollup-plugin-less'

const env = process.env.NODE_ENV;

const config = {
	// entry: './src/index.js',
	entry: './src/index.tsx',
	external: [
		'react',
		'prop-types',
		'rc-select',
		'classnames',
		'react-dom',
		// 'react-virtualized',
		'antd',
	],
	output: {
		file: './lib/ytTable.js',
		format: 'umd',
		name: 'ytTable',
		globals: {
			react: 'React',
			'prop-types': 'PropTypes',
			classnames: 'classnames',
			'react-dom': 'ReactDOM',
			antd: 'antd',
			// 'react-virtualized': 'reactVirtualized',
		},
	},
	// moduleName: 'ytTable',
	plugins: [
		// less(),
		typescript(),
		postcss({
			// extract: true,
			plugins: [],
		}),
		eslint({
			exclude: [
				/\.(less)$/,
				'**/examples/**',
				'lib/**',
				'**/node_modules/**',
				'asert/**',
			],
		}),
		babel({
			exclude: '**/node_modules/**',
			// exclude: '**/node_modules/**',
			plugins: ['external-helpers'],
		}),
		commonjs(),
	],
};

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
	);
}

export default config;
