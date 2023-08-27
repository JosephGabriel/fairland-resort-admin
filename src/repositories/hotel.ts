import { ApolloCache, Reference } from "@apollo/client";

import { CreateHotelMutation } from "@services/apollo/generated/hooks";

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
            nodes: [...previous.nodes, toReference(String(id))],
          };
        },
      },
    });
  }

  onDeleteHotel(hotelId: string, cache: ApolloCache<unknown>) {
    cache.modify({
      fields: {
        hotelsByAdmin: (previous, { readField }) => {
          return {
            count: previous.count.length - 1,
            nodes: previous.nodes.filter(
              (ref: Reference) => hotelId !== readField("id", ref)
            ),
          };
        },
      },
    });

    cache.evict({
      id: `Hotel:${hotelId}`,
    });

    cache.gc();
  }
}
