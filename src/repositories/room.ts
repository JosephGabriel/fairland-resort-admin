import { ApolloCache } from "@apollo/client";

import { GetRoomsByHotelDocument } from "@services/apollo/generated/documents";

import { CreateRoomMutation, OrderBy } from "@services/apollo/generated/hooks";

type MutationResult<T> = T | null | undefined;

export class RoomRepository {
  constructor(private hotelId: string) {}

  private get getHotelByIdQuery() {
    return {
      query: GetRoomsByHotelDocument,
      variables: {
        hotelId: this.hotelId,
        options: {
          skip: 0,
          take: 4,
          orderBy: OrderBy.Desc,
        },
      },
    };
  }

  onAddRoom(
    data: MutationResult<CreateRoomMutation>,
    cache: ApolloCache<unknown>
  ) {
    const rooms = cache.readQuery(this.getHotelByIdQuery);

    if (!rooms || !data?.createRoom) {
      return;
    }

    const newRooms = [...rooms.roomsByHotel.rooms, data.createRoom];

    cache.writeQuery({
      ...this.getHotelByIdQuery,
      data: {
        roomsByHotel: {
          count: newRooms.length,
          rooms: newRooms,
        },
      },
    });
  }

  onDeleteRoom(roomId: string, cache: ApolloCache<unknown>) {
    const rooms = cache.readQuery(this.getHotelByIdQuery);

    if (!rooms?.roomsByHotel) {
      return;
    }

    const newRooms = rooms?.roomsByHotel.rooms.filter((r) => r.id !== roomId);

    cache.writeQuery({
      ...this.getHotelByIdQuery,
      data: {
        roomsByHotel: {
          count: newRooms.length,
          rooms: newRooms,
        },
      },
    });
  }
}
