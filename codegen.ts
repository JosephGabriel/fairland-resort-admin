import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const scalars = {
  EmailAddress: "string",
  Latitude: "number",
  Longitude: "number",
  Password: "string",
  PostalCode: "string",
  DateTime: "Date",
};

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: `${process.env.VITE_BASE_URL}/graphql`,
  documents: "src/**/*.graphql",
  generates: {
    "src/services/apollo/hooks.ts": {
      plugins: ["typescript", "typescript-react-apollo"],
      config: {
        withHooks: true,
        reactApolloVersion: 3,
        strictScalars: true,
        scalars,
      },
    },
    "src/graphql.d.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        strictScalars: true,
        noExport: true,
        scalars,
      },
    },
    "src/services/apollo/type-policies.ts": {
      plugins: ["typescript-apollo-client-helpers"],
      config: {
        strictScalars: true,
        scalars,
      },
    },
  },
};

export default config;
