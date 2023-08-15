import { prisma } from '@monorepo/database';
import type { User } from '@monorepo/database';

export async function getUserfromSession(session: {
	sub: string;
	email: string;
	nickname: string;
}): Promise<User> {
	const user = await prisma.user.findUnique({
		where: {
			auth0: session.sub,
		},
	});

	if (!user) {
		return await prisma.user.create({
			data: {
				auth0: session.sub,
				name: session.nickname,
				role: 'MEMBER',
			},
		});
	}

	return user;
}
