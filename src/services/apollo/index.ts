import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { LocalStorageService } from "../local-storage";

import { authUser } from "./variables/user";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://fairland-resort-api.onrender.com/graphql",
    headers: {
      authorization: `Bearer ${LocalStorageService.getInstance().getItem(
        "token"
      )}`,
    },
  }),
  connectToDevTools: true,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          authUser: {
            read() {
              return authUser();
            },
          },
        },
      },
    },
  }),
});
