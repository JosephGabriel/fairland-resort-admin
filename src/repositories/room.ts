import { ApolloCache, Reference } from "@apollo/client";

import { CreateRoomMutation } from "@services/apollo/generated/hooks";

type MutationResult<T> = T | null | undefined;

export class RoomRepository {
  onAddRoom(
    data: MutationResult<CreateRoomMutation>,
    cache: ApolloCache<unknown>
  ) {
    if (!data) {
      return;
    }

    const id = cache.identify(data?.createRoom);

    cache.modify({
      fields: {
        roomsByHotel: (previous, { toReference }) => {
          return {
            count: previous.count.length + 1,
            nodes: [...previous.nodes, toReference(String(id))],
          };
        },
      },
    });
  }

  onDeleteRoom(roomId: string, cache: ApolloCache<unknown>) {
    cache.modify({
      fields: {
        roomsByHotel: (previous, { readField }) => {
          const nodes = previous.nodes.length
            ? previous.nodes.filter(
                (ref: Reference) => roomId !== readField("id", ref)
              )
            : [];

          return {
            count: previous.count.length - 1,
            nodes,
          };
        },
      },
    });

    cache.evict({
      id: `Room:${roomId}`,
    });

    cache.gc();
  }
}
