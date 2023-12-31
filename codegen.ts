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
  File: "File",
};

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: `${process.env.VITE_BASE_URL}/graphql`,
  documents: "src/**/*.graphql",
  generates: {
    "src/services/apollo/generated/hooks.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        reactApolloVersion: 3,
        strictScalars: true,
        scalars,
      },
    },
    "src/services/apollo/generated/documents.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        strictScalars: true,
        scalars,
      },
    },
    "src/services/apollo/generated/type-policies.ts": {
      plugins: ["typescript-apollo-client-helpers"],
      config: {
        strictScalars: true,
        scalars,
      },
    },
  },
};

export default config;
