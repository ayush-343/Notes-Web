import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Navbar from "./components/Navbar"; // Make sure to import Navbar

const THEMES = ["retro", "forest"];

const App = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "retro"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
