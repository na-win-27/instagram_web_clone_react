import { firebase, FieldValues } from "../lib/firebase";

export const doesUsernameExist = async (username) => {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  // console.log(res);
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

export async function getUserById(uid) {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", uid)
    .get();
  // console.log(res);
  const user = res.docs.map((item) => ({ ...item.data(), docId: item.id }));
  return user;
}

export async function getUsers() {
  const res = await firebase.firestore().collection("users").get();
  // console.log(res);
  const user = res.docs.map((item) => ({ ...item.data(), docId: item.id }));
  return user;
}
