import { LoginUserMutation } from "@services/apollo/hooks";
import { LocalStorageService } from "@services/local-storage";

type MutationResult<T> = T | null | undefined;

export class UserRepository {
  onLogin(data: MutationResult<LoginUserMutation>) {
    LocalStorageService.getInstance().setItem(
      "token",
      `${data?.loginUser.token}`
    );
  }
}
