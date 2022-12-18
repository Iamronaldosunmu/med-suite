import { createContext, useState } from "react";


export const UserContext = createContext();

const UserContextProvider = ({
  children,
}) => {
  const [user, setUser] = useState({
    applicantId: "",
    _id: "",
    email: "",
    createdAt: "",
      updatedAt: "",
    _v: 0
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
