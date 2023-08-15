import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export const config = {
	matcher: ['/posts', '/post/:path*', '/post/create'],
};

export default withMiddlewareAuthRequired();
