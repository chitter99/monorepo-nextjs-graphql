import { useRouter } from 'next/router';
import { useQueryPostById } from '../../hooks';
import { Skeleton } from '@chakra-ui/react';
import { PostEdit } from '../../components';

export default function Page() {
	const router = useRouter();
	const id = router.query.postId as string;

	const { post, isLoading } = useQueryPostById({
		id: id,
	});

	if (isLoading) {
		return <Skeleton size="lg"></Skeleton>;
	}

	// TODO: Fix typings
	return <PostEdit post={post as any} />;
}

Page.useSidebar = true;
