import { ApolloCache } from "@apollo/client";

import { GetHotelsByAdminDocument } from "@services/apollo/documents";
import { CreateHotelMutation } from "@services/apollo/hooks";

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

    cache.writeQuery({
      query: GetHotelsByAdminDocument,
      data: {
        hotelsByAdmin: [...hotels.hotelsByAdmin, data.createHotel],
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

    cache.writeQuery({
      query: GetHotelsByAdminDocument,
      data: {
        hotelsByAdmin: hotels?.hotelsByAdmin?.filter((h) => h.id !== hotelId),
      },
    });
  }
}
