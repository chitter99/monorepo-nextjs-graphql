import {
	Center,
	IconButton,
	Skeleton,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { useQueryPosts } from '../hooks';
import Link from 'next/link';
import { AddIcon, EditIcon } from '@chakra-ui/icons';

export default function Page() {
	const postsQuery = useQueryPosts();

	if (postsQuery.isLoading) {
		return (
			<Stack>
				<Skeleton size="lg" />
				<Skeleton size="lg" />
				<Skeleton size="lg" />
			</Stack>
		);
	}

	return (
		<Stack>
			<Stack direction="row" justifyContent="left">
				<Link href="/post/create">
					<IconButton
						aria-label="Create new post"
						icon={<AddIcon />}
						size="lg"
					/>
				</Link>
			</Stack>
			<TableContainer>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>Title</Th>
							<Th>Content</Th>
							<Th>Action</Th>
						</Tr>
					</Thead>
					<Tbody>
						{postsQuery.posts?.map((post) => (
							<Tr key={post.id}>
								<Td>{post.title}</Td>
								<Td>{post.content}</Td>
								<Td>
									<Link href={'/posts/' + post.id}>
										<IconButton
											aria-label="Edit post"
											icon={<EditIcon />}
										/>
									</Link>
								</Td>
							</Tr>
						))}
						{postsQuery.posts?.length == 0 ? (
							<Center>
								<Text>{'No posts found yet :('}</Text>
							</Center>
						) : null}
					</Tbody>
				</Table>
			</TableContainer>
		</Stack>
	);
}

Page.useSidebar = true;
