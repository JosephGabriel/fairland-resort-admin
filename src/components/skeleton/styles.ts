import { Skeleton, styled } from "@mui/material";

export const ImageSkeleton = styled(Skeleton)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: "100%",
  height: "10rem",
}));

export const TitleSkeleton = styled(Skeleton)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: "60%",
  height: "2rem",
}));
