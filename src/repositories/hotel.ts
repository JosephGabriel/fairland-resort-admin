import { ApolloCache, Reference } from "@apollo/client";

import { GetHotelsByAdminDocument } from "@services/apollo/generated/documents";
import {
  CreateHotelMutation,
  DeleteHotelMutation,
} from "@services/apollo/generated/hooks";

type MutationResult<T> = T | null | undefined;

export class HotelRepository {
  onCreateHotel(
    data: MutationResult<CreateHotelMutation>,
    cache: ApolloCache<unknown>
  ) {
    if (!data) {
      return;
    }

    const id = cache.identify(data?.createHotel);

    cache.modify({
      fields: {
        hotelsByAdmin: (previous, { toReference }) => {
          return {
            count: previous.count.length + 1,
            hotels: [...previous.hotels, toReference(String(id))],
          };
        },
      },
    });
  }

  onDeleteHotel(
    data: MutationResult<DeleteHotelMutation>,
    cache: ApolloCache<unknown>
  ) {
    if (!data) {
      return;
    }

    cache.modify({
      fields: {
        hotelsByAdmin: (previous, { readField }) => {
          return {
            count: previous.count.length - 1,
            hotels: previous.hotels.filter(
              (ref: Reference) => data.deleteHotel.id !== readField("id", ref)
            ),
          };
        },
      },
    });
  }
}
