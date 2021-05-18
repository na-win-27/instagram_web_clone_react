import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { DASHBOARD } from "../constants/route";
import FirebaseContext from "../context/firebase";
import useForm from "../hooks/useForm";
import PointSpreadLoading from "react-loadingg";
// import Firebase from "firebase/app";
import * as validationRules from "../services/firebase";
import is from "date-fns/esm/locale/is/index.js";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { firebase, provider } = useContext(FirebaseContext);

  const history = useHistory();
  // console.log(errors);

  const facebookLogin = async () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;
        // The signed-in user info.
        var user = result.user;
        // console.log(user.email.split("@")[0]);
        const userExist = await validationRules.doesUsernameExist(
          user.email.split("@")[0]
        );
        // console.log(user.uid);

        if (!userExist.length) {
          const res = await firebase
            .firestore()
            .collection("users")
            .add({
              userId: user.uid,
              username: user.email.split("@")[0],
              emailAdress: user.email,
              followers: [],
              fullname: user.displayName,
              following: [],
              dateCreated: Date.now(),
            });
          console.log(res);
          history.push(DASHBOARD);
        }

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);

        // ...
      });
  };
  const handleLogin = async () => {
    try {
      setLoading(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.emailAddress, values.password);
      // console.log(res);
      setLoading(false);
      history.push(DASHBOARD);
    } catch (error) {
      // console.log(error);
      values.emailAddress = "";
      values.password = "";
      setErrors(error);
      setLoading(false);
    }
  };

  const { onChange, onSubmit, values } = useForm(handleLogin, {
    emailAddress: "",
    password: "",
  });

  const isInvalid = values.password === "" || values.emailAddress === "";

  useEffect(() => {
    document.title = "Login-Instagram";
  }, []);
  //container flex mx-auto max-w-screen-md items-center h-screen
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5  mt-10 mr-10  items-center">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-2/5   box-border ">
        <div className="flex flex-col p-6 border border-gray-primary box-border rounded  bg-white">
          <h1 className="flex justify-center w-full ">
            <img
              src="/images/logo.png"
              alt="Intagram Logo"
              className="mt-2 mb-4 w-8/12"
            />
          </h1>
          {errors && (
            <p className="mb-8 text-xs font-bold font-thin text-red-primary">
              {errors.message}
            </p>
          )}
          <form onSubmit={onSubmit} method="POST">
            <input
              name="emailAddress"
              aria-label="Enter Your Email Address"
              className="text-sm bg-white2 text-gray-base mb-4 w-full mr-2 py-5 px-4 h-2  border-gray-base"
              value={values.emailAddress}
              onChange={onChange}
              placeholder="Email address"
              type="email"
            />
            <input
              name="password"
              aria-label="Enter Your Passwords"
              className="text-sm text-gray-base bg-white2 w-full mr-2 py-5 px-4 h-2 border-gray-base"
              value={values.password}
              onChange={onChange}
              placeholder="Password"
              type="password"
            />
            <button
              disabled={isInvalid}
              type="submit"
              onClick={onSubmit}
              className={`bg-blue-medium rounded text-white w-full h-8  mt-6 font-semibold ${
                isInvalid && " opacity-50"
              }`}
            >
              {loading ? "Loading" : "Log In"}
            </button>
          </form>
          <div className="flex flex-row mt-5 items-center ">
            <div className="line  bg-gray-primary"></div>
            <div className=" p-2 font-semibold text-xs text-gray-base">OR</div>
            <div className="line  bg-gray-primary"></div>
          </div>
          <div className="flex flex-row  items-center ">
            <button
              onClick={facebookLogin}
              className={`bg-blue-medium fbutton rounded text-white w-full h-8  mt-6 font-semibold `}
            >
              Login with Facebook
            </button>
          </div>
          <div className="h-10"></div>
        </div>

        <div className="flex rounded justify-center border items-center mt-6 flex-col w-full bg-white p-4 border-gray-primary ">
          <p>
            Dont have an account?
            <Link to="/signup" className="m-0.5 text-blue-medium font-semibold">
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
