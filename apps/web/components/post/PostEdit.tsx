import { useForm } from 'react-hook-form';
import { useCallback } from 'react';
import { Button, Stack, useToast } from '@chakra-ui/react';
import { Post } from '../../generated/graphql';
import { useMutationCreatePost, useMutationUpdatePost } from '../../hooks';
import { Input } from '../form';

type PostShape = Omit<Post, '__typename' | 'createdBy'>;

export function PostEdit({
	post,
	onChange,
}: {
	post: Post;
	onChange?: (post: Post) => void;
}) {
	const toast = useToast();

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		control,
	} = useForm<PostShape>({
		defaultValues: post,
	});

	const createPost = useMutationCreatePost({
		onSuccess(data) {
			toast({
				status: 'success',
				title: 'Post created',
			});
			if (onChange) onChange(data as any);
		},
	});
	const updatePost = useMutationUpdatePost({
		onSuccess(data) {
			toast({
				status: 'success',
				title: 'Post updated',
			});
			if (onChange) onChange(data as any);
		},
	});

	const submit = useCallback(async (values) => {
		if (!post.id) {
			return createPost.mutateAsync(values);
		}
		return updatePost.mutateAsync(values);
	}, []);

	return (
		<form onSubmit={handleSubmit(submit)}>
			<Stack spacing={4}>
				<Input
					label="Title"
					error={errors.title?.message}
					{...register('title', {
						required: 'This is required',
					})}
				/>

				<Input
					label="Content"
					error={errors.content?.message}
					{...register('content', {
						required: 'This is required',
					})}
				/>

				<Button
					variant="solid"
					colorScheme="cyan"
					type="submit"
					isLoading={isSubmitting}
				>
					Save
				</Button>
			</Stack>
		</form>
	);
}
