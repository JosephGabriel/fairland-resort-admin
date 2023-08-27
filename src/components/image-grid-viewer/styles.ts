import { Grid, IconButton, styled } from "@mui/material";

interface CarouselButtonProps {
  isleft?: string;
}

export const CarouselButton = styled(IconButton)(
  ({ isleft }: CarouselButtonProps) => ({
    position: "absolute",
    left: isleft ? 0 : "auto",
    right: isleft ? "auto" : 0,
  })
);

export const ImageGrid = styled(Grid)(({ theme }) => ({
  position: "relative",
  alignItems: "center",
  marginBottom: theme.spacing(8),
}));

export const Image = styled("img")(() => ({
  height: "200px",
  cursor: "pointer",
}));
