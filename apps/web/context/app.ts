import { createContext } from 'react';
import { UseToastOptions } from '@chakra-ui/react';
import { User } from '../generated/graphql';

export type AppContextShape = {
	isSignedIn: boolean;
	user: Omit<User, '__typename'> | null;
	error: (err: Error | string, title?: string) => void;
	toast: (options?: UseToastOptions) => void;
};

export const AppContext = createContext<AppContextShape>({
	isSignedIn: false,
	user: null,
	error: () => null,
	toast: () => null,
});
