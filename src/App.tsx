import { CssBaseline, ThemeProvider, colors, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";

import { Navigation } from "@navigation/.";

import { client } from "@services/apollo";

import { UserContextProvider } from "@contexts/user";

export const App = () => {
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

  return (
    <UserContextProvider>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider autoHideDuration={3000}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Navigation />
            </ThemeProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </UserContextProvider>
  );
};
