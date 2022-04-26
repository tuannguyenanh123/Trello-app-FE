import { useState } from "react";
import "./App.scss";
import AppBar from "./components/AppBar/AppBar";
import BoardBar from "./components/BoardBar/BoardBar";
import BoardContent from "./components/BoardContent/BoardContent";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const setStatusTheme = (state) => {
    setDarkMode(state);
  };
  return (
    <div className={darkMode ? "darkMode" : "trello-container"}>
      <AppBar darkMode={darkMode} setStatusTheme={setStatusTheme} />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;
