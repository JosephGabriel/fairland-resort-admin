import { Grid } from "@mui/material";

import { logoutAuthUser } from "../../services/apollo/variables/user";

export const DashBoardPage = () => {
  return (
    <div>
      <h1>DashBoardPage</h1>

      <button onClick={logoutAuthUser}>sair</button>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          1
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          2
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          3
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          4
        </Grid>
      </Grid>
    </div>
  );
};
