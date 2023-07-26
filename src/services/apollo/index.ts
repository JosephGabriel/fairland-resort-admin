import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { LocalStorageService } from "../local-storage";
import { authUser } from "./user/variables/user";

const httpLink = createHttpLink({
  uri: "https://fairland-resort-api-c5b3bb10838f.herokuapp.com/graphql",
  //uri: "http://localhost:5000/graphql",
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
