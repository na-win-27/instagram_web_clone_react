import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { DASHBOARD } from "../constants/route";
import FirebaseContext from "../context/firebase";
import useForm from "../hooks/useForm";
import PointSpreadLoading from "react-loadingg";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  // console.log(errors);
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
          <div className="h-20"></div>
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
