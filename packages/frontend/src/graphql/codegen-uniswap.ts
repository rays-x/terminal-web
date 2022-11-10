import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  documents: ["src/graphql/queries/uniswap/*.ts"],
  generates: {
    "src/graphql/generated/schema-uniswap.tsx": {
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
