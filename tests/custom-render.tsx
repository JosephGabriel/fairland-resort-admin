import React, { ReactElement } from "react";
import { RenderOptions, render } from "@testing-library/react";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { CssBaseline, ThemeProvider, colors, createTheme } from "@mui/material";
import { setContext } from "@apollo/client/link/context";

import { LocalStorageService } from "../src/services/local-storage";
// import { Navigation } from "../src/navigation";
import { UserContextProvider } from "../src/contexts/user";

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

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        light: "#a6d4fa",
        main: "#90caf9",
        dark: "#648dae",
      },
      secondary: {
        light: colors.orange[400],
        main: colors.orange[500],
        dark: colors.orange[600],
      },
    },
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    connectToDevTools: true,
    cache: new InMemoryCache(),
  });

  return (
    <UserContextProvider>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider autoHideDuration={3000}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </UserContextProvider>
  );
};
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
