import { useEffect, useState, useContext } from "react";
import UserContext from "../context/user";
import { getUserById } from "../services/firebase";
const useUser = () => {
  const [user, setUser] = useState("");
  const { user: authUser } = useContext(UserContext);

  useEffect(() => {
    async function userById() {
      const res = await getUserById(authUser.uid);
      // console.log(res);
      setUser(res);
    }
    if (authUser?.uid) {
      userById();
    }
  }, [authUser?.uid]);
  // console.log(user);
  return user;
};

export default useUser;
