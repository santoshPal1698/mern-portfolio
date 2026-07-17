import { lazy } from "react";
const Home = lazy(() => import("../Components/Home"));
const vihanLanding = lazy(() => import("../Components/LandingPage/Viahaantechlanding"));
// import ProtectedRoute from "../Protected/ProtectedRoute";
const Admin = lazy(() => import("../Components/sections/Admin"));
const Login = lazy(() => import("../Components/sections/Admin/Login"));
const Weather = lazy(() => import("../Components/Weather"));
const PageNotFound = lazy(() => import("../Components/PageNotFound"));
const travelers = lazy(() => import("../Components/Tour-Travels/Vihan"));


const allRoutes = [
  { path: "/",element: Home},
  { path: "/user/:name", element: Home},
  { path: "/vihaan",element: vihanLanding},
  { path: "/weather",element: Weather},
  { path: "/dv-travels",  element: travelers },
  { path: "/login", element: Login},
  { path: "/admin-dashboard", element: Admin, protected: true },
  { path: "/429", element: PageNotFound },
  { path: "*", element: PageNotFound},
];

export default allRoutes;
