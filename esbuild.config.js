const esbuild = require('esbuild');
const glob = require('glob');
const path = require('path');

// Get all .js files in the api directory
const entryPoints = glob.sync('./api/**/*.js');

// Get all dependencies from package.json
const packageJson = require('./package.json');
const dependencies = [
  ...Object.keys(packageJson.dependencies || {}),
  ...Object.keys(packageJson.devDependencies || {}),
  ...Object.keys(packageJson.peerDependencies || {}),
];

// Convert dependencies to external flags
const externalFlags = dependencies.map(dep => dep.replace(/@[^/]+\/[^/]+/, '')).map(dep => `--external:${dep}`).join(' ');

esbuild.build({
  entryPoints: entryPoints,
  bundle: true,
  outfile: 'dist/bundle.js',
  minify: true,
  sourcemap: true,
  platform: 'node',
  external: dependencies,
}).catch(() => process.exit(1));
