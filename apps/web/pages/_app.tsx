import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { AppProvider } from '../components/app';
import { SidebarWithHeader } from '../components';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24,
		},
	},
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	useSidebar?: boolean;
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout ??
		(Component.useSidebar
			? (page) => <SidebarWithHeader>{page}</SidebarWithHeader>
			: (page) => page);

	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<ChakraProvider>
					<AppProvider>
						{getLayout(<Component {...pageProps} />)}
					</AppProvider>
				</ChakraProvider>
			</UserProvider>
			<ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
		</QueryClientProvider>
	);
}
