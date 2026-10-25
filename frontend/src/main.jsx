import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import App from "./App.jsx";
import AuthProvider from "../src/context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
AOS.init({
  duration: 900,
  once: true,
  easing: "ease-out",
});
createRoot(document.getElementById("root")).render(
 
    <AuthProvider>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="dark"
    />
      <App />
    </AuthProvider>

);
