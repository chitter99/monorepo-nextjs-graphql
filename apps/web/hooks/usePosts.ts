import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
} from '@tanstack/react-query';
import { graphql } from '../generated';
import { useApp } from './useApp';
import { graphQLClient } from '../lib';
import {
	CreatePostMutation,
	CreatePostMutationVariables,
	PostByIdQuery,
	PostsQuery,
	PostsQueryVariables,
	UpdatePostMutation,
	UpdatePostMutationVariables,
} from '../generated/graphql';

export const postsQuery = graphql(`
	query posts {
		posts {
			id
			title
			content
			createdBy {
				name
			}
		}
	}
`);

export function useQueryPosts(
	options?: UseQueryOptions<unknown, unknown, PostsQuery['posts']>,
) {
	const { error } = useApp();
	const query = useQuery<unknown, unknown, PostsQuery['posts']>({
		queryKey: ['useQueryPosts'],
		queryFn: async () =>
			(await graphQLClient.request(postsQuery, {})).posts,
		onError: (err: any) => {
			error(err);
		},
		...options,
	});
	return { ...query, posts: query.data };
}

export const postByIdQuery = graphql(`
	query postById($id: String!) {
		postById(id: $id) {
			id
			title
			content
			createdBy {
				name
			}
		}
	}
`);

export function useQueryPostById({
	id,
	...options
}: { id: string } & UseQueryOptions<
	unknown,
	unknown,
	PostByIdQuery['postById']
>) {
	const { error } = useApp();
	const query = useQuery<unknown, unknown, PostByIdQuery['postById']>({
		queryKey: ['useQueryPostById'],
		queryFn: async () =>
			(
				await graphQLClient.request(postByIdQuery, {
					id: id,
				})
			).postById,
		onError: (err: any) => {
			error(err);
		},
		...options,
	});
	return { ...query, post: query.data };
}

export const createPostMutation = graphql(`
	mutation createPost($title: String!, $content: String!) {
		createPost(content: $content, title: $title) {
			id
		}
	}
`);

export function useMutationCreatePost(
	options?: UseMutationOptions<
		CreatePostMutation['createPost'],
		unknown,
		CreatePostMutationVariables
	>,
) {
	const { error } = useApp();
	const mutation = useMutation<
		CreatePostMutation['createPost'],
		unknown,
		CreatePostMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(createPostMutation, data)).createPost,
		onError: (err: any) => {
			error(err);
		},
		...options,
	});
	return { ...mutation, post: mutation.data };
}

export const updatePostMutation = graphql(`
	mutation updatePost($id: String!, $title: String!, $content: String!) {
		updatePostById(id: $id, content: $content, title: $title) {
			id
		}
	}
`);

export function useMutationUpdatePost(
	options?: UseMutationOptions<
		UpdatePostMutation['updatePostById'],
		unknown,
		UpdatePostMutationVariables
	>,
) {
	const { error } = useApp();
	const mutation = useMutation<
		UpdatePostMutation['updatePostById'],
		unknown,
		UpdatePostMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(updatePostMutation, data))
				.updatePostById,
		onError: (err: any) => {
			error(err);
		},
		...options,
	});
	return { ...mutation, post: mutation.data };
}
