import "./App.css";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";

export type View = "login" | "register" | "dashboard";
export type SetView = Dispatch<SetStateAction<View>>;

function App() {
  const [view, setView] = useState<View>("login");

  function showDashboard(): void {
    setView("dashboard");
  }

  return (
    <main>
      {view === "login" && <Login setView={setView} onLogin={showDashboard} />}
      {view === "register" && (
        <Register setView={setView} onRegister={showDashboard} />
      )}
      {view === "dashboard" && <Dashboard setView={setView} />}
    </main>
  );
}

export default App;
