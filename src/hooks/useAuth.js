import { useEffect, useState, useContext } from "react";
import FirebaseContext from "../context/firebase";

const useAuth = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listner = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        localStorage.setItem("authUser", JSON.stringify(authUser));
      } else {
        setUser(null);
        localStorage.removeItem("authUser");
      }
    });
    return () => listner();
  }, [firebase]);
  return { user };
};

export default useAuth;
