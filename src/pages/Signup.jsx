import { useState } from "react";

function Signup({ showLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("dms_users")) || [];

    const userExists = users.find(
      (user) => user.email === email.toLowerCase()
    );

    if (userExists) {
      setMessage("This email is already registered.");
      return;
    }

    const newUser = {
      name,
      email: email.toLowerCase(),
      password,
      role,
    };

    users.push(newUser);

    localStorage.setItem("dms_users", JSON.stringify(users));

    setMessage("Signup successful! Please login.");

    setName("");
    setEmail("");
    setPassword("");

    setTimeout(() => {
      showLogin();
    }, 1000);
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🚨 Disaster Management</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>

        <p className="message">{message}</p>

        <p>
          Already have an account?{" "}
          <span className="link" onClick={showLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;