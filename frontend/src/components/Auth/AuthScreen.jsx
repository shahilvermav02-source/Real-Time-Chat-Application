import { useState, useRef } from "react";
import Login from "./Login";
import Register from "./Register";

function AuthScreen({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      {isLogin ? (
        <Login
          onLoginSuccess={onLoginSuccess}
          onToggle={() => setIsLogin(false)}
        />
      ) : (
        <Register onToggle={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default AuthScreen;
