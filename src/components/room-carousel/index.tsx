import { Grid } from "@mui/material";

import { CustomSkeleton } from "@components/skeleton";
import { Card } from "@components/card";

import { GetRoomsByHotelQuery } from "@services/apollo/hooks";

import * as Material from "./styles";

interface Props {
  isLoading: boolean;
  rooms: GetRoomsByHotelQuery["roomsByHotel"]["rooms"] | undefined;
  onDeleteRoom: (id: string) => void;
}

export const RoomCarousel = ({ isLoading, rooms, onDeleteRoom }: Props) => {
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

      {rooms?.length ? (
        <>
          {rooms?.map((room) => (
            <Grid item md={3} key={room.id}>
              <Card
                id={room.id}
                name={room.name}
                thumbnail={room.thumbnail}
                summary={room.summary}
                onRemove={onDeleteRoom}
                isLink={false}
              />
            </Grid>
          ))}
        </>
      ) : (
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
