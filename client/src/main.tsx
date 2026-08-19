import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { OpenAPI } from "./api/generated";
import { tokenStorage } from "./api/tokenStorage";

// Configure Generated API OpenAPI Client
OpenAPI.BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/api$/, "")
  : "http://localhost:5000";
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.TOKEN = async () => {
  return tokenStorage.getAccessToken() || "";
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
