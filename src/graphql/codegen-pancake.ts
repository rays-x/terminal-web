import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema/pancake/pancakeswap-schema.graphql',
  documents: ['src/graphql/queries/pancake/*.ts'],
  generates: {
    'src/graphql/generated/schema-pancake.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true
      }
    }
  }
};

export default config;
