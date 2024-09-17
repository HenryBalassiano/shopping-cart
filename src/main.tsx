import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {ProductProvider} from "./context/StoreContext.tsx";

// Conditionally set the basename based on environment (development or production)
const basename = process.env.NODE_ENV === "production" ? "/shopping-cart" : "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ProductProvider>
  </StrictMode>
);
