import { useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

import { graphql } from '../generated';
import { useApp } from './useApp';
import { graphQLClient } from '../lib';

const postsQuery = graphql(`
	query postQuery {
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

export function useQueryPosts() {
	const { error } = useApp();
	const query = useQuery({
		queryKey: ['useQueryPosts'],
		queryFn: async () => graphQLClient.request(postsQuery, {}),
		onError: (err: any) => {
			error(err);
		},
	});
	return { ...query, posts: query.data?.posts };
}
