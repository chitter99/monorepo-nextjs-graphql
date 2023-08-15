module.exports = {
	root: true,
	// This tells ESLint to load the config from the package `@monorepo/eslint`
	extends: ['custom'],
	settings: {
		next: {
			rootDir: ['apps/*/'],
		},
	},
};
