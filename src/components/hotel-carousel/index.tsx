import { Grid } from "@mui/material";

import { CustomSkeleton } from "@components/skeleton";
import { Card } from "@components/card";

import { GetHotelsByAdminQuery } from "@services/apollo/generated/hooks";

import * as Material from "./styles";

interface Props {
  isLoading: boolean;
  hotels: GetHotelsByAdminQuery["hotelsByAdmin"]["nodes"] | undefined;
  onEditModal: (id: string) => void;
  onDeleteHotel: (id: string) => void;
}

export const HotelCarousel = ({
  isLoading,
  hotels,
  onDeleteHotel,
  onEditModal,
}: Props) => {
  return (
    <Grid container spacing={4}>
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
                onEdit={onEditModal}
                onRemove={onDeleteHotel}
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
