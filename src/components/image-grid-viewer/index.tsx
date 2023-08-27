import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Grid } from "@mui/material";

import * as Material from "./styles";

interface Props {
  images?: string[];
}

export const ImageGridCarousel = ({ images }: Props) => {
  return (
    <PhotoProvider>
      <Material.ImageGrid container>
        <Material.CarouselButton isleft="true">
          <ChevronLeft />
        </Material.CarouselButton>

        <Material.CarouselButton>
          <ChevronRight />
        </Material.CarouselButton>

        {images?.map((image, index) => (
          <Grid item md={3} key={index}>
            <PhotoView src={image}>
              <Material.Image src={image} />
            </PhotoView>
          </Grid>
        ))}
      </Material.ImageGrid>
    </PhotoProvider>
  );
};
