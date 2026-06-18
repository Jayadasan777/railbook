import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const name =
        localStorage.getItem("userName");

      const email =
        localStorage.getItem("userEmail");

      setUser({
        name,
        email,
      });

      const res = await axios.get(
        `https://railbook-c0ws.onrender.com/api/bookings/${userId}`
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const activeTickets =
    bookings.filter(
      (b) => b.bookingStatus !== "Cancelled"
    ).length;

  const cancelledTickets =
    bookings.filter(
      (b) => b.bookingStatus === "Cancelled"
    ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)",
        color: "white",
      }}
    >
      <Navbar />

      <div
        style={{
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            marginBottom: "30px",
          }}
        >
          👤 My Profile
        </h1>

        {/* PROFILE CARD */}

        <div
          style={{
            width: "500px",
            margin: "auto",
            background:
              "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="user"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              marginBottom: "15px",
              border:
                "4px solid #38bdf8",
            }}
          />

          <h2>{user.name}</h2>

          <p
            style={{
              color: "#cbd5e1",
            }}
          >
            {user.email}
          </p>

          <p>
            Railway Passenger Account
          </p>
        </div>

        {/* STATS */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              width: "220px",
              background:
                "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2>🎟</h2>
            <h3>Total Bookings</h3>
            <h1>{bookings.length}</h1>
          </div>

          <div
            style={{
              width: "220px",
              background:
                "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2>✅</h2>
            <h3>Active Tickets</h3>
            <h1>{activeTickets}</h1>
          </div>

          <div
            style={{
              width: "220px",
              background:
                "rgba(255,255,255,0.08)",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2>❌</h2>
            <h3>Cancelled</h3>
            <h1>{cancelledTickets}</h1>
          </div>
        </div>

        {/* ACCOUNT DETAILS */}

        <div
          style={{
            width: "70%",
            margin: "40px auto",
            background:
              "rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          <h2>
            🚆 Passenger Information
          </h2>

          <hr />

          <p>
            <strong>Name:</strong>{" "}
            {user.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user.email}
          </p>

          <p>
            <strong>User ID:</strong>{" "}
            {localStorage.getItem("userId")}
          </p>

          <p>
            <strong>Account Type:</strong>{" "}
            Passenger
          </p>

          <p>
            <strong>Status:</strong>{" "}
            Active
          </p>
        </div>

        {/* JOURNEY MESSAGE */}

        <div
          style={{
            marginTop: "30px",
            fontSize: "20px",
          }}
        >
          🚆 Thank you for travelling
          with RailBook.
          <br />
          We wish you a safe and happy
          journey.
        </div>
      </div>
    </div>
  );
}

export default Profile;
