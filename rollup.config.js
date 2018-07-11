import svelte from 'rollup-plugin-svelte';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript';

export default [
	{
		input: ['src/main.ts', 'src/renderer.ts'],
		output: {
			dir: 'dist',
			format: 'cjs',
			sourcemap: true
		},
		plugins: [
			resolve(),
			svelte({
				css: css => {
					css.write('static/svelte.css')
				},
				nestedTransitions: true,
				skipIntroByDefault: true
			}),
			commonjs(),
			json(),
			typescript({
				typescript: require('typescript')
			})
		],
		experimentalCodeSplitting: true,
		experimentalDynamicImport: true,
		external: [
			'electron',
			'child_process',
			'fs',
			'path',
			'url',
			'module',
			'os'
		]
	}
];