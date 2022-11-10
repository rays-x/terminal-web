import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2',
  documents: ["src/graphql/queries/pancake/*.ts"],
  generates: {
    "src/graphql/generated/schema-pancake.tsx": {
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
