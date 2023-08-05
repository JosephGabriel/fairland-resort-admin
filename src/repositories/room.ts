import { ApolloCache } from "@apollo/client";

import { GetHotelByIdDocument } from "@services/apollo/documents";

import { OrderBy } from "@services/apollo/hooks";

export class RoomRepository {
  private getHotelByIdQuery(id: string) {
    return {
      query: GetHotelByIdDocument,
      variables: {
        id: `${id}`,
        roomOptions: {
          skip: 0,
          take: 4,
          orderBy: OrderBy.Desc,
        },
      },
    };
  }

  onDeleteRoom(hotelId: string, roomId: string, cache: ApolloCache<unknown>) {
    const hotel = cache.readQuery(this.getHotelByIdQuery(hotelId));

    if (!hotel?.hotel) {
      return;
    }

    const rooms = hotel?.hotel.rooms.filter((r) => r.id !== roomId);

    cache.writeQuery({
      ...this.getHotelByIdQuery(hotelId),
      data: {
        hotel: {
          ...hotel?.hotel,
          rooms,
        },
      },
    });
  }
}
