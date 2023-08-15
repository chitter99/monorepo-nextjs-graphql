import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin, {
	PothosScopeAuthPlugin,
} from '@pothos/plugin-scope-auth';
import PrismaPlugin from '@pothos/plugin-prisma';
import { DateResolver, DateTimeResolver } from 'graphql-scalars';

import { prisma } from '@monorepo/database';
import type { PrismaTypes, User } from '@monorepo/database';

export type Context = {
	user: User | null;
};

// TODO: There is another bug in pothos, create a issue for this
if (!SchemaBuilder.prototype.constructor.plugins['scopeAuth']) {
	SchemaBuilder.registerPlugin('scopeAuth', PothosScopeAuthPlugin);
}

export const builder = new SchemaBuilder<{
	Scalars: {
		Date: { Input: Date; Output: Date };
		DateTime: { Input: Date; Output: Date };
	};
	Context: Context;
	DefaultFiednullability: true;
	PrismaTypes: PrismaTypes;
	AuthScopes: {
		member: boolean;
		admin: boolean;
	};
}>(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	{
		plugins: [ScopeAuthPlugin, PrismaPlugin],
		prisma: {
			client: prisma,
			exposeDescriptions: true,
			filterConnectionTotalCount: true,
		},
		authScopes: async (context) => ({
			member: !!(context.user?.role == 'MEMBER'),
			admin: !!(context.user?.role == 'ADMIN'),
		}),
		scopeAuthOptions: {
			authorizeOnSubscribe: true,
		},
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		defaultFiednullability: true,
		allowPluginReRegistration: true,
	},
);

builder.addScalarType('Date', DateResolver, {});
builder.addScalarType('DateTime', DateTimeResolver, {});
builder.queryType({});
builder.mutationType({});
