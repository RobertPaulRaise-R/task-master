import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard.tsx";
import Projects from "./pages/Projects.tsx";
import Tasks from "./pages/Tasks.tsx";
import Calendar from "./pages/Calendar.tsx";
import Chat from "./pages/Chat.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route path="app" element={<App />}>
            <Route index path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" />

            <Route path="teams" />
            <Route path="activity" />
            <Route path="chat" element={<Chat />} />

            <Route path="calendar" element={<Calendar />} />
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
  </StrictMode>,
);
