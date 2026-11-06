import { useState } from "react";

function Login({ onLogin, showSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("dms_users")) || [];

    const user = users.find(
      (u) =>
        u.email === email.toLowerCase() &&
        u.password === password
    );

    if (!user) {
      setMessage("Invalid email or password.");
      return;
    }

    setMessage("Login successful!");
    onLogin(user);
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🚨 Disaster Management</h1>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p className="message">{message}</p>

        <p>
          New user?{" "}
          <span className="link" onClick={showSignup}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;