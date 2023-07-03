import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://fairland-resort-api.onrender.com/graphql",
  }),
  connectToDevTools: true,
  cache: new InMemoryCache(),
});
