import { prisma } from '@monorepo/database';
import { builder } from '../builder';

function onlyLoggedInUser(user: any, args: any, context: any, info: any) {
	if (context.user?.id == user.id) return true;
	return {
		admin: true,
	};
}

builder.prismaObject('User', {
	fields: (t) => ({
		id: t.exposeID('id'),
		name: t.exposeString('name'),
		role: t.exposeString('role', {
			authScopes: onlyLoggedInUser,
		}),
	}),
});

builder.queryField('me', (t) =>
	t.prismaField({
		authScopes: {
			member: true,
			admin: true,
		},
		type: 'User',
		resolve: async (query, root, args, ctx, info) => {
			return prisma.user.findUniqueOrThrow({
				...query,
				where: {
					id: ctx.user!.id,
				},
			});
		},
	}),
);
