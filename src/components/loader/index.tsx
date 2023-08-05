import { CircularProgress, Grow, LinearProgress } from "@mui/material";

import * as Material from "./styles";

interface Props {
  variant: "linear" | "backdrop";
  isLoading: boolean;
}

export const Loader = ({ variant = "linear", isLoading }: Props) => {
  if (variant == "linear") {
    return (
      <Grow in={isLoading}>
        <LinearProgress />
      </Grow>
    );
  }

  return (
    <Material.BackDropContainer open={isLoading}>
      <CircularProgress />
    </Material.BackDropContainer>
  );
};
