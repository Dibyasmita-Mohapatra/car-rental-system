import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { WishlistProvider } from "./context/WishlistContext";
import { CompareProvider } from "./context/CompareContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <CompareProvider>
        <App />
      </CompareProvider>
    </WishlistProvider>
  </StrictMode>
);