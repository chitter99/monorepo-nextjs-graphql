import Link from 'next/link';
import { Button, Container, Heading, Stack, Text } from '@chakra-ui/react';

export default function Page() {
	return (
		<Stack
			spacing={{ base: 8, md: 10 }}
			direction={{ base: 'column', md: 'row' }}
			pt={24}
		>
			<Stack spacing={{ base: 8, md: 10 }} flexBasis="50%">
				<Heading>Restricted area 🍢</Heading>
				<Text>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
					diam nonumy eirmod tempor invidunt ut labore et dolore magna
					aliquyam erat, sed diam voluptua.
				</Text>
			</Stack>
			<Stack flexBasis="50%" w="full" alignItems="center">
				<Link href="/api/auth/login?returnTo=/posts">
					<Button colorScheme="blue">Login</Button>
				</Link>
				<Link href="/api/auth/login?returnTo=/posts&screen_hint=signup">
					<Button variant="outline" colorScheme="blue">
						Register
					</Button>
				</Link>
			</Stack>
		</Stack>
	);
}

Page.getLayout = (page) => (
	<Container maxWidth="container.lg" centerContent>
		{page}
	</Container>
);
