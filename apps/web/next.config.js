module.exports = {
	reactStrictMode: true,
	transpilePackages: ['@monorepo/database', '@monorepo/graphql'],
	webpack: (config, { isServer }) => {
		if (isServer) {
			return {
				...config,
				externals: [
					{
						'@pothos/core': '@pothos/core',
						'@pothos/plugin-scope-auth':
							'@pothos/plugin-scope-auth',
						'@pothos/plugin-prisma':
							'commonjs @pothos/plugin-prisma',
						'react-hook-form': 'react-hook-form',
					},
					...config.externals,
				],
			};
		}
		return config;
	},
};
