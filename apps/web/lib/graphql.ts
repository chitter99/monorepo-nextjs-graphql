import { GraphQLClient } from 'graphql-request';

function getBaseUrl() {
	if (typeof window !== 'undefined') {
		return '';
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}
	return `http://127.0.0.1:${process.env.PORT ?? 3000}`;
}

export const graphQLClient = new GraphQLClient(getBaseUrl() + '/api/graphql', {
	fetch,
});
