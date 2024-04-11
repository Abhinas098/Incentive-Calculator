import { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Register with email:", email, "and password:", password);

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isAdmin: false, //------>   Change on basis of ur requirement ,  Change it to true if you want to be an admin
        }),
      });
      if (response.ok) {
        toast.success("Registration Success, Login Now!");
        navigate("/login");
      } else {
        throw new Error("Registration failed");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="E-mail"
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
          Register
        </button>{" "}
      </form>

      <h3>
        Registered User <Link to={"/login"}>Login</Link>
      </h3>
    </div>
  );
}
