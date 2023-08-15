import { createYoga, getUserfromSession, schema } from '@monorepo/graphql';
import { getSession } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default createYoga<{
	req: NextApiRequest;
	res: NextApiResponse;
}>({
	graphqlEndpoint: '/api/graphql',
	schema,
	context: async ({ req, res }) => {
		const session = await getSession(req, res);
		if (!session) return { user: null };
		return {
			user: await getUserfromSession(session.user as any),
		};
	},
});
