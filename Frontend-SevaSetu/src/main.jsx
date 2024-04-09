import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Foundation from "@/components/foundation/Foundation.jsx";
import PaymentSuccess from "./components/payment/PaymentSuccess.jsx";
import { AddPaymentDetail } from "./components/payment/AddPaymentDetail.jsx";
import NotFound from "./components/NotFound.jsx";
import { RegisterFoundation } from "./components/auth/RegisterFoundation.jsx";
import LoginFoundation from "./components/auth/LoginFoundation.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import store from "./Redux/store.js";
import AboutUs from "./components/aboutUs/AboutUs.jsx";
import Home from "./components/Landing/Home.jsx";
import Explore from "./components/Landing/Explore.jsx";
import PaymentFail from "./components/payment/PaymentFail.jsx";
import Forgotpassword from "./components/auth/Forgotpassword.jsx";
import Resetpassword from "./components/auth/Resetpassword.jsx";
// import HeaderNew from "./components/header/HeaderNew.jsx";

let persistor = persistStore(store);
export const server = "https://sevasetu-zpdg.onrender.com";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/foundation/details/:id" element={<Foundation />} />
        <Route
          path="/paymentsuccess/:Pid/:name/:email"
          element={<PaymentSuccess />}
        />
        <Route path="/paymentfail/:id" element={<PaymentFail />} />
        <Route path="/Aboutus" element={<AboutUs />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/addpaymentdetail/:foundationId"
          element={<AddPaymentDetail />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/foundation/register" element={<RegisterFoundation />} />
      <Route path="/foundation/login" element={<LoginFoundation />} />
      <Route
        path="/foundation/login/forgotpassword"
        element={<Forgotpassword />}
      />
      <Route
        path="/foundation/login/resetpassword/:token/:ex"
        element={<Resetpassword />}
      />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
