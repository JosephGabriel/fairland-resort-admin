import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

import { LocalStorageService } from "../local-storage";
import { authUser } from "./user/variables/user";

const token = LocalStorageService.getInstance().getItem("token");

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://fairland-resort-api-c5b3bb10838f.herokuapp.com/graphql",
    headers: {
      authorization: `Bearer ${token}`,
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
