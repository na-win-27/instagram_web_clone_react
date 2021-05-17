import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { DASHBOARD, LOGIN } from "../constants/route";
import FirebaseContext from "../context/firebase";
import useForm from "../hooks/useForm";
import * as validationRules from "../services/firebase";

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  // console.log(errors);
  const handleSignUp = async () => {
    try {
      const emailExist = await validationRules.doesEmailExist(
        values.emailAddress
      );
      const userExist = await validationRules.doesUsernameExist(
        values.username
      );
      if (!userExist.length && !emailExist.length) {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(values.emailAddress, values.password);
        await createdUserResult.user.updateProfile({
          displayName: values.username,
        });

        const res = await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: values.username.toLowerCase(),
          emailAdress: values.emailAddress.toLowerCase(),
          fullname: values.name,
          following: [],
          dateCreated: Date.now(),
        });
        console.log(res);
        history.push(DASHBOARD);
      } else {
        console.log("ldshf");
        setErrors({
          message: userExist.length
            ? "Enter a unique Username"
            : "Email Already exists",
        });
      }
    } catch (error) {
      // console.log(error);
      values.emailAddress = "";
      values.password = "";
      values.name = "";
      values.username = "";
      setErrors(error);
    }
  };

  const { onChange, onSubmit, values } = useForm(handleSignUp, {
    emailAddress: "",
    password: "",
    name: "",
    username: "",
  });

  const isInvalid =
    values.password === "" ||
    values.emailAddress === "" ||
    values.name === "" ||
    values.username === "";

  useEffect(() => {
    document.title = "SignUp-Instagram";
  }, []);
  //container flex mx-auto max-w-screen-md items-center h-screen
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5    items-center">
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
            <p className="mb-8 text-xs font-bold  text-red-primary">
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
              name="name"
              aria-label="Enter Your Name"
              className="text-sm bg-white2 text-gray-base mb-4 w-full mr-2 py-5 px-4 h-2  border-gray-base"
              value={values.name}
              onChange={onChange}
              placeholder="Your Full Name"
              type="text"
            />

            <input
              name="username"
              aria-label="Enter Username"
              className="text-sm bg-white2 text-gray-base mb-4 w-full mr-2 py-5 px-4 h-2  border-gray-base"
              value={values.username}
              onChange={onChange}
              placeholder="Your Username"
              type="text"
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
              Sign Up
            </button>
          </form>
          <div className="h-5"></div>
        </div>

        <div className="flex rounded justify-center border items-center mt-6 flex-col w-full bg-white p-4 border-gray-primary ">
          <p>
            Already have an account?
            <Link to={LOGIN} className="m-0.5 text-blue-medium font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
