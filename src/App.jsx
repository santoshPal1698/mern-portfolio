import React, { Suspense } from "react";
import ScrollToTopButton from "./Components/sections/ScrollToTopButton";
import allRoutes from "./Routes/routes";
import Spin_loader from "./Components/Spin-loader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataFetcher from "./services/DataFetcher";

const App = () => {
  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <DataFetcher />
        <ScrollToTopButton />
        <Suspense fallback={<Spin_loader />}>
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

export default App;
