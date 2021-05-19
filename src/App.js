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
import useAuth from "./hooks/useAuth";
import UserContext from "./context/user";
//mport PointSpreadLoading from "react-loadingg";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { user } = useAuth();
  // console.log(user.uid);
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>LOADING</p>}>
          <Switch>
            <Route path={LOGIN} component={Login} />
            <Route path={SIGN_UP} component={SignUp} />
            <Route path={DASHBOARD} component={Dashboard} />
            <Route path={NOT_FOUND} component={NotFound} />
            <Route path={PROFILE} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
