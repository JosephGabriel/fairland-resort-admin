import { Grid } from "@mui/material";

import { CustomSkeleton } from "@src/components/skeleton";
import { HotelCard } from "@src/components/hotel-card";

import * as Material from "./styles";

interface Props {
  isLoading: boolean;
  rooms: GetRoomsByHotelQuery["roomsByHotel"]["nodes"] | undefined;
}

export const RoomCarousel = ({ isLoading, rooms }: Props) => {
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

      {!isLoading && rooms?.length !== 0 && (
        <>
          {rooms?.map((room) => (
            <Grid item md={3} key={room.id}>
              <HotelCard
                id={room.id}
                name={room.name}
                thumbnail={room.thumbnail}
                summary={room.summary}
                isLink={false}
              />
            </Grid>
          ))}
        </>
      )}

      {!isLoading && rooms?.length === 0 && (
        <Grid item md={12}>
          <Material.NoRoomPaper>
            <Material.NoRoomPaperText variant="body1">
              Nenhum quarto adicionado
            </Material.NoRoomPaperText>
          </Material.NoRoomPaper>
        </Grid>
      )}
    </Grid>
  );
};
