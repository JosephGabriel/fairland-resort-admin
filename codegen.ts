import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: "http://localhost:5000/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/services/apollo/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: true,
        withHooks: true,
        reactApolloVersion: 3,
        strictScalars: true,
        avoidOptionals: true,
        scalars: {
          EmailAddress: "string",
          Latitude: "number",
          Longitude: "number",
          Password: "string",
          PostalCode: "string",
        },
      },
    },
  },
};

export default config;
