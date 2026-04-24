import styled, { ThemeProvider } from "styled-components";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { PORTFOLIOPOINTS } from "./Api/Endpoints";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading,ReloadData,SetPortfolioData,showLoading,} from "./redux/rootSlice";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Themes";
// import Navbar from "./Components/Navbar";
import ScrollToTopButton from "./Components/sections/ScrollToTopButton";
import allRoutes from "./Routes/routes";
import Spin_loader from "./Components/Spin-loader";
import { BrowserRouter, Routes, Route, useLocation, useParams } from 'react-router-dom';
import DataFetcher from "./services/DataFetcher";


const App = () => {
//   const { name } = useParams();
//   console.log("Name from URL:", name,allRoutes);
//   const dispatch = useDispatch();
//   const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  
//   // const [theme, setTheme] = useState("dark");
//   // const themeToggler = () => {
//   //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   // };

// //   useEffect(() => {
// //   if (reloadData || !portfolioData) {
// //     if (name) {
// //       getAllPortFoliobyName(name);
// //       alert(`Fetching portfolio data for user: ${name}`);
// //     } else {
// //       getAllPortFolio();
// //       alert("No name provided in URL. Fetching default portfolio data.");
// //     }
// //   }
// // }, [portfolioData,reloadData]);

// //   const getAllPortFolio = async () => {
// //     dispatch(showLoading());
// //     try {
// //       const { data } = await axios.get(
// //         `${PORTFOLIOPOINTS.ApiBaseUrl}get-portfolio`
// //       );
// //       dispatch(SetPortfolioData(data?.data || []));
// //       dispatch(ReloadData(false));
// //     } catch (error) {
// //       // message.error(error?.response?.data?.message || "Something went wrong");
// //     } finally {
// //       dispatch(hideLoading());
// //     }
// //   };

// //   const getAllPortFoliobyName = async (name) => {
// //     dispatch(showLoading());
// //     try {
// //       const { data } = await axios.get(
// //         `${PORTFOLIOPOINTS.ApiBaseUrl}get-portfolio/${name}`
// //       );
// //       dispatch(SetPortfolioData(data?.data || []));
// //       dispatch(ReloadData(false));
// //     } catch (error) {
// //       // message.error(error?.response?.data?.message || "Something went wrong");
// //     } finally {
// //       dispatch(hideLoading());
// //     }
// //   };

  return (
    <>
      {/* <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}> */}

        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTopButton />
           <DataFetcher /> 
         <Suspense fallback={ <Spin_loader /> }>
          {/* <ConditionalNavbar theme={theme} toggleThemeControl={themeToggler} /> */}
          <Routes>
            {allRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
          </Suspense>
        </BrowserRouter>

      {/* </ThemeProvider> */}
    </>
  );
};

// const ConditionalNavbar = ({ theme, toggleThemeControl }) => {
//   const location = useLocation();
//   const hideNavbarRoutes = ["/login", "/admin-dashboard",'/weather', '/dv-travels', "/vihaan-tech"];
//   return !hideNavbarRoutes.includes(location.pathname) ? (
//     <Navbar theme={theme} toggleThemeControl={toggleThemeControl} />
//   ) : null;
// };

export default App;
