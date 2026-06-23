import { useState, useEffect } from "react";
import "./styles/App.css";
import AuthScreen from "./components/Auth/AuthScreen";
import ChatApp from "./components/Chat/ChatApp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <AuthScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ChatApp currentUser={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
