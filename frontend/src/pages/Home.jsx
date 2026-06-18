import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Home() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);

  const searchTrains = async () => {
    try {
      const res = await axios.get(
        `https://railbook-c0ws.onrender.com/api/trains/search?source=${source}&destination=${destination}`
      );

      setTrains(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed To Search Trains");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Navbar />

      {/* HERO SECTION */}

      <div
        style={{
          height: "500px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: "40px",
            borderRadius: "15px",
            textAlign: "center",
            width: "500px",
          }}
        >
          <h1
            style={{
              fontSize: "50px",
              marginBottom: "10px",
            }}
          >
            🚆 RailBook
          </h1>

          <p
            style={{
              fontSize: "20px",
              marginBottom: "30px",
            }}
          >
            India's Smart Railway Reservation Platform
          </p>

          <input
            type="text"
            placeholder="From Station"
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            style={{
              width: "90%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <input
            type="text"
            placeholder="To Station"
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
            style={{
              width: "90%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <input
            type="date"
            style={{
              width: "90%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <button
            onClick={searchTrains}
            style={{
              width: "95%",
              padding: "12px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            Search Trains
          </button>
        </div>
      </div>

      {/* FEATURES */}

      <div
        style={{
          textAlign: "center",
          padding: "50px 20px",
        }}
      >
        <h1>Why Choose RailBook?</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              width: "250px",
              backgroundColor: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>🚆</h2>
            <h3>Train Search</h3>
            <p>Find trains instantly.</p>
          </div>

          <div
            style={{
              width: "250px",
              backgroundColor: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>🎟</h2>
            <h3>Instant Booking</h3>
            <p>Book tickets quickly.</p>
          </div>

          <div
            style={{
              width: "250px",
              backgroundColor: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>📍</h2>
            <h3>PNR Status</h3>
            <p>Track your ticket status.</p>
          </div>

          <div
            style={{
              width: "250px",
              backgroundColor: "#1e293b",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h2>📄</h2>
            <h3>PDF Tickets</h3>
            <p>Download tickets anytime.</p>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div
        style={{
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1>RailBook Statistics</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              backgroundColor: "#2563eb",
              padding: "25px",
              width: "200px",
              borderRadius: "12px",
            }}
          >
            <h1>50+</h1>
            <h3>Trains</h3>
          </div>

          <div
            style={{
              backgroundColor: "#2563eb",
              padding: "25px",
              width: "200px",
              borderRadius: "12px",
            }}
          >
            <h1>500+</h1>
            <h3>Bookings</h3>
          </div>

          <div
            style={{
              backgroundColor: "#2563eb",
              padding: "25px",
              width: "200px",
              borderRadius: "12px",
            }}
          >
            <h1>1000+</h1>
            <h3>Passengers</h3>
          </div>
        </div>
      </div>

      {/* TRAIN RESULTS */}

      <div
        style={{
          textAlign: "center",
          paddingBottom: "50px",
        }}
      >
        {trains.length > 0 ? (
          <>
            <h1>Available Trains</h1>

            {trains.map((train) => (
              <div
                key={train._id}
                style={{
                  width: "70%",
                  margin: "20px auto",
                  backgroundColor: "#1e293b",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h2>{train.trainName}</h2>

                <p>
                  Train No:
                  {train.trainNumber}
                </p>

                <p>
                  {train.source} ➜{" "}
                  {train.destination}
                </p>

                <p>
                  Departure:
                  {train.departureTime}
                </p>

                <p>
                  Arrival:
                  {train.arrivalTime}
                </p>

                <p>
                  Seats:
                  {train.availableSeats}
                </p>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "selectedTrain",
                      JSON.stringify(train)
                    );

                    window.location.href =
                      "/booking";
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor:
                      "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Book Ticket
                </button>
              </div>
            ))}
          </>
        ) : (
          <h2
            style={{
              marginBottom: "50px",
            }}
          >
            Search trains to begin your journey 🚆
          </h2>
        )}
      </div>
    </div>
  );
}

export default Home;
