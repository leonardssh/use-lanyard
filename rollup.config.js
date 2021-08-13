import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import PascalCase from 'pascalcase';

const VUE_DEMI_IIFE = fs.readFileSync(require.resolve('vue-demi/lib/index.iife.js'), 'utf-8');

const injectVueDemi = {
	name: 'inject-vue-demi',
	renderChunk(code) {
		return `${VUE_DEMI_IIFE};\n;${code}`;
	}
};

const outputConfigs = {
	// each file name has the format: `dist/${name}.${format}.js`
	// format being a key of this object
	'esm-bundler': {
		file: pkg.module,
		format: `es`
	},
	cjs: {
		file: pkg.main,
		format: `cjs`
	},
	global: {
		file: pkg.unpkg,
		format: `iife`
	},
	esm: {
		file: pkg.module.replace('bundler', 'browser'),
		format: `es`
	}
};

const allFormats = Object.keys(outputConfigs);
const packageFormats = allFormats;
const packageConfigs = packageFormats.map((format) =>
	createConfig(format, outputConfigs[format], format === 'iife' ? [injectVueDemi] : [])
);

export default packageConfigs;

function createConfig(format, output, plugins = []) {
	output.sourcemap = Boolean(process.env.SOURCE_MAP);
	output.externalLiveBindings = false;
	output.globals = {
		'vue-demi': 'VueDemi',
		vue: 'Vue'
	};

	const isGlobalBuild = format === 'global';

	if (isGlobalBuild) {
		output.name = PascalCase(pkg.name);
	}

	const tsPlugin = ts({
		check: false,
		tsconfig: path.resolve(__dirname, 'tsconfig.json'),
		cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
		tsconfigOverride: {
			compilerOptions: {
				declaration: false
			}
		}
	});

	const external = ['vue-demi', 'vue'];
	const nodePlugins = [resolve(), commonjs()];

	return {
		input: `src/index.ts`,
		// Global and Browser ESM builds inlines everything so that they can be used alone.
		external,
		plugins: [tsPlugin, ...nodePlugins, ...plugins],
		output
	};
}
