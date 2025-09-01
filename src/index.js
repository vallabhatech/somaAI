import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Lessons from "./Lessons";
import LessonPage from "./LessonPage";
import AIPage from "./AIPage";
import { AuthProvider } from "./AuthContext";
import SignInPage from "./SignInPage"; // (make this, see below)
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="chat" element={<AIPage />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="lesson/:id" element={<LessonPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="*" element={<h1>Error 404: Page not found.</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);