import { GraphQLSchema } from 'graphql';
import { builder } from './builder';

import './models';

export const schema: GraphQLSchema = builder.toSchema();
