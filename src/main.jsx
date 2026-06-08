import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";
import App from "./App.jsx";
import "./index.css";
import { initAnalytics } from "./utils/analytics";

initAnalytics();

ReactGA.initialize("G-67LYP968YK");
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname + window.location.search
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
