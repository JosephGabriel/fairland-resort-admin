import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { LocalStorageService } from "../local-storage";
import { authUser } from "./user/variables/user";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:5000/graphql",
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
              // const user = LocalStorageService.getInstance().getItem("user");

              // if (!user) {
              //   return null;
              // }

              // return JSON.parse(user);

              return authUser();
            },
          },
        },
      },
    },
  }),
});
