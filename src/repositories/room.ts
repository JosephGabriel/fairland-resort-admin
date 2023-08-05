import { ApolloCache } from "@apollo/client";

import { GetHotelByIdDocument } from "@services/apollo/documents";
import { CreateRoomMutation, OrderBy } from "@services/apollo/hooks";

type CacheMutationData<T> = T | null | undefined;

export class RoomRepository {
  constructor(private hotelId: string) {}

  private get getHotelByIdQuery() {
    return {
      query: GetHotelByIdDocument,
      variables: {
        id: `${this.hotelId}`,
        roomOptions: {
          skip: 0,
          take: 4,
          orderBy: OrderBy.Desc,
        },
      },
    };
  }

  onAddRoom(
    data: CacheMutationData<CreateRoomMutation>,
    cache: ApolloCache<unknown>
  ) {
    const hotel = cache.readQuery(this.getHotelByIdQuery);

    if (!hotel || !data?.createRoom) {
      return;
    }

    const room = data.createRoom;

    cache.writeQuery({
      ...this.getHotelByIdQuery,
      data: {
        hotel: {
          ...hotel?.hotel,
          rooms: [...hotel.hotel.rooms, room],
        },
      },
    });
  }

  onDeleteRoom(roomId: string, cache: ApolloCache<unknown>) {
    const hotel = cache.readQuery(this.getHotelByIdQuery);

    if (!hotel?.hotel) {
      return;
    }

    const rooms = hotel?.hotel.rooms.filter((r) => r.id !== roomId);

    cache.writeQuery({
      ...this.getHotelByIdQuery,
      data: {
        hotel: {
          ...hotel?.hotel,
          rooms,
        },
      },
    });
  }
}
