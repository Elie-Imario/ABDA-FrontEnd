import React from "react";
import ReactDOM from "react-dom/client";
import AppProvider from "./service/context/index.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
