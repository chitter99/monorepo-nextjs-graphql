import { printSchema } from 'graphql';
import { schema } from '@monorepo/graphql';

module.exports = {
	schema: printSchema(schema),
	documents: ['./**/!(*.d).{ts,tsx}'],
	debug: true,
	ignoreNoDocuments: true,
	verbose: true,
	overwrite: true,
	generates: {
		'./generated/': {
			preset: 'client',
		},
	},
};
