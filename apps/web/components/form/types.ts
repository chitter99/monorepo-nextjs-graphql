import { FieldError } from 'react-hook-form';

export type InputPropsShape = {
	error: string | FieldError | null;
	label: string;
};
