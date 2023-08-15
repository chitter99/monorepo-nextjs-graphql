import { prisma } from '@monorepo/database';
import { builder } from '../builder';

builder.prismaObject('Post', {
	authScopes: {
		member: true,
		admin: true,
	},
	fields: (t) => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		content: t.exposeString('content'),
		createdBy: t.relation('createdBy'),
	}),
});

builder.queryField('posts', (t) =>
	t.prismaField({
		type: ['Post'],
		resolve: async (query, root, args, ctx, info) => {
			return prisma.post.findMany({
				...query,
			});
		},
	}),
);

builder.queryField('postById', (t) =>
	t.prismaField({
		type: 'Post',
		args: {
			id: t.arg.string({ required: true }),
		},
		resolve: async (query, root, args, ctx, info) => {
			return prisma.post.findUniqueOrThrow({
				...query,
				where: {
					id: args.id,
				},
			});
		},
	}),
);

builder.mutationField('createPost', (t) =>
	t.prismaField({
		authScopes: {
			member: true,
			admin: true,
		},
		type: 'Post',
		args: {
			title: t.arg.string({ required: true }),
			content: t.arg.string({ required: true }),
		},
		resolve: async (query, root, args, ctx, info) => {
			return prisma.post.create({
				...query,
				data: {
					createdById: ctx.user!.id,
					title: args.title,
					content: args.content,
				},
			});
		},
	}),
);

builder.mutationField('updatePostById', (t) =>
	t.prismaField({
		authScopes: {
			member: true,
			admin: true,
		},
		type: 'Post',
		args: {
			id: t.arg.string({ required: true }),
			title: t.arg.string({ required: false }),
			content: t.arg.string({ required: false }),
		},
		resolve: async (query, root, args, ctx, info) => {
			const post = await prisma.post.findUniqueOrThrow({
				where: {
					id: args.id,
				},
			});

			if (ctx.user?.role != 'ADMIN' && post.createdById != ctx.user?.id) {
				throw new Error('User not allowed!');
			}

			return prisma.post.update({
				...query,
				where: {
					id: args.id,
				},
				data: {
					title: args.title || undefined,
					content: args.content || undefined,
				},
			});
		},
	}),
);
