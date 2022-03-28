import { Routes , Route} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { useAuth } from "./store/AuthProvider";
import PageNotFound from "./components/Error/PageNotFound";
import ErrorBoundary from "./components/Error/ErrorBoundary";

// const PrivateRoute = () => {
//   const {user} = useAuth();
//   return user ? <Outlet /> : <Navigate to="/login" />
// }

const App = () => {

  return (
    <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </ErrorBoundary>
  );
}

export default App;
