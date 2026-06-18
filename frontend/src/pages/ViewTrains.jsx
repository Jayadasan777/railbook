import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ViewTrains() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/trains"
      );

      setTrains(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed To Load Trains");
    }
  };

  const deleteTrain = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/trains/${id}`
      );

      alert("Train Deleted Successfully");
      fetchTrains();
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Train");
    }
  };

  const editTrain = (train) => {
    localStorage.setItem(
      "editTrain",
      JSON.stringify(train)
    );

    window.location.href = "/edit-train";
  };

  const bookTrain = (train) => {
    localStorage.setItem(
      "selectedTrain",
      JSON.stringify(train)
    );

    window.location.href = "/booking";
  };

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
            fontSize: "45px",
            marginBottom: "10px",
          }}
        >
          🚆 Available Trains
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "40px",
          }}
        >
          Browse and Manage Railway Services
        </p>

        {trains.length === 0 ? (
          <h2>No Trains Available</h2>
        ) : (
          trains.map((train) => (
            <div
              key={train._id}
              style={{
                width: "85%",
                margin: "20px auto",
                background:
                  "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: "18px",
                padding: "25px",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.4)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2>
                    🚆 {train.trainName}
                  </h2>

                  <p>
                    Train No:
                    {" "}
                    {train.trainNumber}
                  </p>
                </div>

                <div>
                  <h3>
                    {train.source}
                  </h3>

                  <p>⬇</p>

                  <h3>
                    {train.destination}
                  </h3>
                </div>

                <div>
                  <p>
                    Departure:
                    {" "}
                    {train.departureTime}
                  </p>

                  <p>
                    Arrival:
                    {" "}
                    {train.arrivalTime}
                  </p>
                </div>

                <div>
                  <h3>
                    💺
                    {" "}
                    {train.availableSeats}
                  </h3>

                  <p>Seats Available</p>
                </div>
              </div>

              <hr
                style={{
                  margin: "20px 0",
                  borderColor:
                    "rgba(255,255,255,0.2)",
                }}
              />

              <button
                onClick={() =>
                  bookTrain(train)
                }
                style={bookBtn}
              >
                🎟 Book Now
              </button>

              {" "}

              <button
                onClick={() =>
                  editTrain(train)
                }
                style={editBtn}
              >
                ✏ Edit
              </button>

              {" "}

              <button
                onClick={() =>
                  deleteTrain(train._id)
                }
                style={deleteBtn}
              >
                🗑 Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const bookBtn = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};

const editBtn = {
  background: "#f59e0b",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  marginLeft: "10px",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  marginLeft: "10px",
};

export default ViewTrains;