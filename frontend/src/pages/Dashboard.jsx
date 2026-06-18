import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState({
    totalTrains: 0,
    totalBookings: 0,
    totalAvailableSeats: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "https://railbook-c0ws.onrender.com/api/dashboard/stats"
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed To Load Dashboard Stats");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          minHeight: "90vh",
          padding: "40px",
          background:
            "linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url('https://images.unsplash.com/photo-1474487548417-781cb71495f3')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1>🚆 RailBook Control Center</h1>

          <p
            style={{
              fontSize: "20px",
              color: "#dbeafe",
            }}
          >
            Smart Railway Reservation Management
          </p>
        </div>

        {/* STATISTICS */}

        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1>🚆</h1>
            <h3>Total Trains</h3>
            <h1>{stats.totalTrains}</h1>
          </div>

          <div className="dashboard-card">
            <h1>🎟️</h1>
            <h3>Total Bookings</h3>
            <h1>{stats.totalBookings}</h1>
          </div>

          <div className="dashboard-card">
            <h1>💺</h1>
            <h3>Available Seats</h3>
            <h1>{stats.totalAvailableSeats}</h1>
          </div>
        </div>

        {/* ACTIONS */}

        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          <h2>Quick Actions</h2>

          <br />

          <button
            onClick={() =>
              (window.location.href =
                "/add-train")
            }
          >
            ➕ Add Train
          </button>

          {"  "}

          <button
            onClick={() =>
              (window.location.href =
                "/view-trains")
            }
          >
            🚆 View Trains
          </button>

          {"  "}

          <button
            onClick={() =>
              (window.location.href =
                "/my-bookings")
            }
          >
            🎟 My Bookings
          </button>

          {"  "}

          <button
            onClick={() =>
              (window.location.href =
                "/profile")
            }
          >
            👤 Profile
          </button>

          {"  "}

          <button
            style={{
              background: "#dc2626",
              color: "white",
            }}
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>

        {/* ABOUT */}

        <div
          style={{
            maxWidth: "900px",
            margin: "50px auto",
            background: "white",
            color: "black",
            padding: "30px",
            borderRadius: "15px",
            boxShadow:
              "0 5px 20px rgba(0,0,0,.3)",
          }}
        >
          <h2>About RailBook</h2>

          <br />

          <p>
            RailBook is a full-stack MERN
            Railway Reservation System
            designed to simplify train
            ticket booking and journey
            management.
          </p>

          <br />

          <p>
            Features include Train Search,
            PNR Tracking, Ticket Booking,
            Ticket Cancellation, PDF Ticket
            Generation, User Profiles and
            Dashboard Analytics.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
