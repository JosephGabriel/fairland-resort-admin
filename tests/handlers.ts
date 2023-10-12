import * as Graphql from "../src/services/apollo/documents";

import { graphql } from "msw";

export const handlers = [
  graphql.mutation<Graphql.LoginUserMutation>("LoginUser", (req, res, ctx) => {
    return res(
      ctx.data({
        loginUser: {
          token: "uktutftdrul",
          user: {
            __typename: "User",
            id: "3445453",
            role: Graphql.UserRole.Admin,
            avatar: "www.url.com",
            active: true,
            firstName: "Admin",
            lastName: "Admin",
            verified: true,
          },
          __typename: "AuthPayload",
        },
      })
    );
  }),
];
