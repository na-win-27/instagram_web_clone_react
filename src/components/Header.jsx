import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/user";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/route";

//TODO:when user is loged out make login buuton on header

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  // console.log("User", user);
  const history = useHistory();
  return (
    <div className="h-16  border-gray-primary bg-white">
      <div className="container max-w-screen-lg h-full">
        <div className="text-gray-700 flex justify-between text-center items-center align-items cursor-pointer">
          <h1 className="flex ml-20 pt-2 w-full">
            <Link to={ROUTES.DASHBOARD}>
              <img
                src="/images/logo.png"
                alt={"INSTAGRAM"}
                className="mt-2 w-6/12"
              />
            </Link>
          </h1>
          <div className=" pt-2 flex flex-row text-gray-700 w-2 text-center items-center align-items">
            {user ? (
              <div className="flex flex-row pt-2">
                <Link className=" flex-row " to={ROUTES.DASHBOARD}>
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  className="flex flex-row"
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    firebase.auth().signOut();
                    history.push(ROUTES.LOGIN);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      firebase.auth().signOut();
                      history.push(ROUTES.LOGIN);
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="items-center p-0  flex cursor-pointer">
                  <Link className="dp" to={`/p/${user.displayName}`}>
                    <img
                      src="/images/avatars/karl.jpg"
                      alt="Profile"
                      className="rounded-full p-0 flex"
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
