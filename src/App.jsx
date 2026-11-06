import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("dms_current_user")) || null
  );

  function handleLogin(user) {
    localStorage.setItem("dms_current_user", JSON.stringify(user));
    setCurrentUser(user);
  }

  function handleLogout() {
    localStorage.removeItem("dms_current_user");
    setCurrentUser(null);
    setCurrentPage("login");
  }

  if (currentUser) {
    return (
      <Dashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <>
      {currentPage === "login" ? (
        <Login
          onLogin={handleLogin}
          showSignup={() => setCurrentPage("signup")}
        />
      ) : (
        <Signup showLogin={() => setCurrentPage("login")} />
      )}
    </>
  );
}

export default App;