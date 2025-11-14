import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserContext, dummyUser } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserContext.Provider value={dummyUser}>
        <App />
      </UserContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);
