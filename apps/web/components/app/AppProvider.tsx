import { useToast, UseToastOptions } from '@chakra-ui/react';
import { PropsWithChildren, useEffect, useState } from 'react';

import { AppContext, AppContextShape } from '../../context';
import { useUser } from '@auth0/nextjs-auth0/client';
import { graphql } from '../../generated';
import { graphQLClient } from '../../lib';

const queryMe = graphql(`
	query me {
		me {
			id
			name
			role
		}
	}
`);

const defaultToastOptions: UseToastOptions = {
	variant: 'top-accent',
	duration: 6000,
	isClosable: true,
};
const toastIdError = 'app-error';

export function AppProvider({ children }: PropsWithChildren<any>) {
	const toast = useToast();
	const { user } = useUser();
	const [ctx, setCtx] = useState<AppContextShape>({
		isSignedIn: false,
		user: null,
		error(err, title) {
			err = err instanceof Error ? err : new Error(err);
			console.error(err);
			if (!toast.isActive(toastIdError)) {
				toast({
					id: toastIdError,
					...defaultToastOptions,
					status: 'error',
					title: title || 'A wild 🐞 appeared!',
				});
			}
		},
		toast(options?: UseToastOptions) {
			toast({
				...defaultToastOptions,
				...options,
			});
		},
	});

	useEffect(() => {
		console.log('hook');
		if (user) {
			console.log('User loggedIn');
			graphQLClient.request(queryMe, {}).then((data) =>
				setCtx((ctx) => ({
					...ctx,
					isSignedIn: true,
					user: data.me,
				})),
			);
		}
		console.log('User not loggedIn');
		setCtx((ctx) => ({
			...ctx,
			isSignedIn: false,
			user: null,
		}));
	}, [user]);

	return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
}
