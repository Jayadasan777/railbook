import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "userId",
        res.data.user._id
      );

      localStorage.setItem(
        "userName",
        res.data.user.name
      );

      localStorage.setItem(
        "userEmail",
        res.data.user.email
      );

      alert("Login Successful");

      window.location.href =
        "/dashboard";
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('https://images.unsplash.com/photo-1519003722824-194d4455a60c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "15px",
            width: "400px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,.3)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color: "#1e3a8a",
              marginBottom: "10px",
            }}
          >
            🚆 RailBook Login
          </h1>

          <p
            style={{
              color: "gray",
              marginBottom: "25px",
            }}
          >
            Login to continue your journey
          </p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <br />
          <br />

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "#1e3a8a",
              color: "white",
            }}
          >
            Login
          </button>

          <br />
          <br />

          <p
            style={{
              color: "#555",
            }}
          >
            Safe & Secure Railway Booking
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;