import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AddTrain() {
  const [trainNumber, setTrainNumber] = useState("");
  const [trainName, setTrainName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://railbook-c0ws.onrender.com/api/trains/add",
        {
          trainNumber,
          trainName,
          source,
          destination,
          departureTime,
          arrivalTime,
          availableSeats,
        }
      );

      alert(res.data.message);

      setTrainNumber("");
      setTrainName("");
      setSource("");
      setDestination("");
      setDepartureTime("");
      setArrivalTime("");
      setAvailableSeats("");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Train");
    }
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
          🚆 Add New Train
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            marginBottom: "30px",
          }}
        >
          Railway Management Panel
        </p>

        <div
          style={{
            width: "600px",
            margin: "auto",
            background:
              "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            padding: "35px",
            boxShadow:
              "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          <input
            type="text"
            placeholder="Train Number"
            value={trainNumber}
            onChange={(e) =>
              setTrainNumber(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Train Name"
            value={trainName}
            onChange={(e) =>
              setTrainName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Source Station"
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Destination Station"
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Departure Time"
            value={departureTime}
            onChange={(e) =>
              setDepartureTime(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Arrival Time"
            value={arrivalTime}
            onChange={(e) =>
              setArrivalTime(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Available Seats"
            value={availableSeats}
            onChange={(e) =>
              setAvailableSeats(e.target.value)
            }
            style={inputStyle}
          />

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#2563eb",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            🚆 Add Train
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default AddTrain;
