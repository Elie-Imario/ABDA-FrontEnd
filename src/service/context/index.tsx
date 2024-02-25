import { FC, ReactNode, createContext, useState } from "react";
import { User } from "../types/dataTypes";

type Props = {
  children: ReactNode;
};

export const AppContext = createContext({
  UserLogContext: {} as User | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAppContext: (_val: User | undefined): void => {},
});

const AppProvider: FC<Props> = ({ children }) => {
  const logged = sessionStorage.getItem("connectedUser");
  const [UserLogContext, setUserLogContext] = useState<User | undefined>(
    JSON.parse(logged as string) as User
  );

  const setAppContext = (user: User | undefined) => {
    setUserLogContext(user);
  };

  return (
    <AppContext.Provider
      value={{
        UserLogContext,
        setAppContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
