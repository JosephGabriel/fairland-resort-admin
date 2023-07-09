import { gql, makeVar, useQuery } from "@apollo/client";

import { LocalStorageService } from "../../../local-storage";
import { Maybe, LoginUserMutation as User } from "../../generated";

interface AuthUserQuery {
  authUser: User["loginUser"]["user"];
}

export const AUTH_USER_QUERY = gql`
  query AuthUser {
    authUser @client {
      id
      role
      avatar
      active
      firstName
      lastName
      verified
    }
  }
`;

export const authUser = makeVar<Maybe<User["loginUser"]["user"]>>(
  LocalStorageService.getInstance().getItem("user")
    ? JSON.parse(LocalStorageService.getInstance().getItem("user") ?? "")
    : null
);

export const useAuthUserQuery = () => useQuery<AuthUserQuery>(AUTH_USER_QUERY);

export const logoutAuthUser = () => {
  LocalStorageService.getInstance().removeItem("user");

  authUser(null);
};
