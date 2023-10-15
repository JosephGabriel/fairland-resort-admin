import { Grid } from "@mui/material";

import { CustomSkeleton } from "@src/components/skeleton";
import { Card } from "@src/components/card";

import * as Material from "./styles";

interface Props {
  isLoading: boolean;
  hotels: GetHotelsByAdminQuery["hotelsByAdmin"]["nodes"] | undefined;
}

export const HotelCarousel: React.FC<Props> = ({ isLoading, hotels }) => {
  return (
    <Grid container alignItems={"stretch"} spacing={4}>
      {isLoading && (
        <>
          {new Array(4).fill(" ").map((_, idx) => (
            <Material.GridItemCard item md={3} key={idx}>
              <CustomSkeleton variant="card" />
            </Material.GridItemCard>
          ))}
        </>
      )}

      {!isLoading && hotels?.length !== 0 && (
        <>
          {hotels?.map((hotel) => (
            <Grid item md={3} key={hotel.id}>
              <Card
                id={hotel.id}
                name={hotel.name}
                thumbnail={hotel.thumbnail}
                summary={hotel.summary}
                city={hotel.city}
                state={hotel.state}
                isLink={true}
              />
            </Grid>
          ))}
        </>
      )}

      {!isLoading && hotels?.length === 0 && (
        <Grid item md={12}>
          <Material.NoHotelPaper>
            <Material.NoHotelPaperText variant="body1">
              Nenhum quarto adicionado
            </Material.NoHotelPaperText>
          </Material.NoHotelPaper>
        </Grid>
      )}
    </Grid>
  );
};
