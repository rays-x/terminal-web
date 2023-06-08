import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  documents: ['src/graphql/queries/uniswap3/*.ts'],
  generates: {
    'src/graphql/generated/schema-uniswap.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-client-helpers',
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
