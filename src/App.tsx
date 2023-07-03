import { CssBaseline, ThemeProvider, colors, createTheme } from "@mui/material";
import { ApolloProvider } from "@apollo/client";

import { Navigation } from "./navigation";

import { client } from "./services/apollo";

export const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        light: colors.blueGrey[400],
        main: colors.blueGrey[500],
        dark: colors.blueGrey[600],
      },
      secondary: {
        light: colors.orange[400],
        main: colors.orange[500],
        dark: colors.orange[600],
      },
    },
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
      </ThemeProvider>
    </ApolloProvider>
  );
};
