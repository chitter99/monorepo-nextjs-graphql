import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input as InputOriginal,
	InputProps,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { InputPropsShape } from './types';

export const Input = forwardRef(
	({ error, label, ...props }: InputPropsShape & InputProps, ref) => {
		const isError = !!error;
		return (
			<>
				<FormControl isInvalid={isError}>
					<FormLabel>{label}</FormLabel>
					<InputOriginal ref={ref} {...props} />
				</FormControl>
				{isError ? (
					<FormErrorMessage>{error.toString()}</FormErrorMessage>
				) : null}
			</>
		);
	},
);
Input.displayName = 'Input';
