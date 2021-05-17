import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  DASHBOARD,
  LOGIN,
  SIGN_UP,
  PROFILE,
  NOT_FOUND,
} from "./constants/route";
import "./styles/app.css";
//mport PointSpreadLoading from "react-loadingg";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/SignUp"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>LOADING</p>}>
        <Switch>
          <Route path={LOGIN} component={Login} />
          <Route path={SIGN_UP} component={SignUp} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
