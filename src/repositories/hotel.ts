import { ApolloCache } from "@apollo/client";

import { GetHotelsByAdminDocument } from "@services/apollo/generated/documents";
import { CreateHotelMutation } from "@services/apollo/generated/hooks";

type MutationResult<T> = T | null | undefined;

export class HotelRepository {
  onCreateHotel(
    data: MutationResult<CreateHotelMutation>,
    cache: ApolloCache<unknown>
  ) {
    const hotels = cache.readQuery({
      query: GetHotelsByAdminDocument,
    });

    if (!hotels?.hotelsByAdmin || !data?.createHotel) {
      return;
    }

    const newHotels = [...hotels.hotelsByAdmin.hotels, data.createHotel];

    cache.writeQuery({
      query: GetHotelsByAdminDocument,
      data: {
        hotelsByAdmin: {
          count: newHotels.length,
          hotels: newHotels,
        },
      },
    });
  }

  onDeleteHotel(hotelId: string, cache: ApolloCache<unknown>) {
    const hotels = cache.readQuery({
      query: GetHotelsByAdminDocument,
    });

    if (!hotels) {
      return;
    }
    alert(hotels?.hotelsByAdmin.hotels.length);

    const newHotels = hotels?.hotelsByAdmin.hotels?.filter(
      (h) => h.id !== hotelId
    );

    alert(newHotels.length);

    cache.writeQuery({
      query: GetHotelsByAdminDocument,
      data: {
        hotelsByAdmin: {
          count: newHotels.length,
          hotels: newHotels,
        },
      },
    });
  }
}
