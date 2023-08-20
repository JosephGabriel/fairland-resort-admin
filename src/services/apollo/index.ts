import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { LocalStorageService } from "@services/local-storage";

import { TypedTypePolicies } from "./generated/type-policies";

const typePolicies: TypedTypePolicies = {};

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = LocalStorageService.getInstance().getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies,
  }),
});
