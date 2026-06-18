import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successful");
    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <h2>🚆 RailBook</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Link to="/">
          <button>Home</button>
        </Link>

        {!token ? (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">
              <button>Dashboard</button>
            </Link>

            <Link to="/my-bookings">
              <button>My Bookings</button>
            </Link>

            <Link to="/pnr-status">
              <button>PNR Search</button>
            </Link>

            <Link to="/profile">
              <button>Profile</button>
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
