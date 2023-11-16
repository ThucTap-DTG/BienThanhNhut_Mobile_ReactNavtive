import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type User = {
  username: string;
  password: string;
  diachi: string;
  gioitinh: string;
};

type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const userContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [page, setpage] = useState<Number>(5);
  const [limit,setllimit] = useState<number>(5);

  useEffect(() => {
    const load = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const password = await AsyncStorage.getItem("password");
        const diachi = await AsyncStorage.getItem("diachi");
        const gioitinh = await AsyncStorage.getItem("gioitinh");

        if (username) {
          const user: User = {
            username: username,
            password: password || "",
            diachi: diachi || "",
            gioitinh: gioitinh || "",
          };
          setUser(user);
        }
      } catch (error) {
        console.error("Không có dữ liệu", error);
      }
    };

    load();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
