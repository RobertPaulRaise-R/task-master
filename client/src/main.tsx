import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./features/dashboard/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="app" element={<App />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="tasks" />
            <Route path="projects" />
            <Route path="projects/:id" />

            <Route path="teams" />
            <Route path="activity" />
            <Route path="chat" />

            <Route path="calendar" />
            <Route path="timeline" />
            <Route path="analytics" />

            <Route path="settings" />
            <Route path="notification" />
            <Route path="archives" />
            <Route path="templates" />

            <Route path="404" />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
