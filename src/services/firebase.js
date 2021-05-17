import { firebase, FieldValues } from "../lib/firebase";

export const doesUsernameExist = async (username) => {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return res.docs.map((user) => user.length > 0);
};

export const doesEmailExist = async (emailAddress) => {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("emailAdress", "==", emailAddress)
    .get();

  return res.docs.map((user) => user.length > 0);
};
