import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { LoginUserMutation } from "@services/apollo/hooks";
import { LocalStorageService } from "@services/local-storage";

type User = LoginUserMutation["loginUser"]["user"];

interface UserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface Props {
  children: ReactNode;
}

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {
    return;
  },
});

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [user, setUserLocal] = useState<User | null>(null);

  const getUser = () => {
    const user = LocalStorageService.getInstance().getItem("user");

    setUserLocal(user ? (JSON.parse(user) as User) : null);
  };

  const setUser = (user: User | null) => {
    if (!user) {
      LocalStorageService.getInstance().removeItem("user");
    }

    LocalStorageService.getInstance().setItem("user", JSON.stringify(user));

    setUserLocal(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);
