import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCtx from "../../context/AuthCtx";
import { toast } from "react-hot-toast";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ctx = useContext(AuthCtx);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Login Successfully!");

        const isAdmin = data?.isAdmin;
        isAdmin ? navigate("/packages") : navigate("/incentive");

        ctx.login(data);
      } else {
        throw new Error("Login failed!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={styles.authContainer}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitButton}>
            Login
          </button>{" "}
        </form>

        <h3>
          New user <Link to={"/register"}>Register</Link>
        </h3>
      </div>
    </>
  );
}
