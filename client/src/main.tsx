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
import LandingPage from "./pages/LandingPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import Timeline from "./pages/Timeline.tsx";
import Settings from "./pages/Settings.tsx";
import People from "./pages/People.tsx";
import Profile from "./pages/Profile.tsx";
import Project from "./features/projects/Project.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/signup" element={<SignUp />} />

            <Route path="/login" element={<Login />} />

            <Route path="app" element={<App />}>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<Project />} />

              <Route path="people" element={<People />} />
              <Route path="chat" element={<Chat />} />

              <Route path="calendar" element={<Calendar />} />
              <Route path="timeline" element={<Timeline />} />
              <Route path="analytics" />

              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notification" />

              <Route path="404" />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
