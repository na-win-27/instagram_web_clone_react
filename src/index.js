import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue, provider } from "./lib/firebase";
import "./index.css";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue, provider }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
