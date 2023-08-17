import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Post } from '../../generated/graphql';
import { PostEdit } from '../../components';

export default function Page() {
	const router = useRouter();
	const redirectToNewPost = useCallback(
		(post: Post) => router.push('/post/' + post.id),
		[router],
	);
	return <PostEdit post={{} as any} onChange={redirectToNewPost} />;
}

Page.useSidebar = true;
