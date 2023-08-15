import { prisma } from './client';

async function main() {
	await prisma.$connect();
	const user = await prisma.user.create({
		data: {
			name: 'James Bond',
			auth0: 'AAAAAAAABBBB',
			role: 'MEMBER',
		},
	});
	await prisma.post.create({
		data: {
			title: 'Example',
			content: 'This is a sample post',
			createdById: user.id,
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
