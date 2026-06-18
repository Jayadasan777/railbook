import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function EditTrain() {
  const train = JSON.parse(
    localStorage.getItem("editTrain")
  );

  const [trainNumber, setTrainNumber] = useState(
    train?.trainNumber || ""
  );

  const [trainName, setTrainName] = useState(
    train?.trainName || ""
  );

  const [source, setSource] = useState(
    train?.source || ""
  );

  const [destination, setDestination] = useState(
    train?.destination || ""
  );

  const [departureTime, setDepartureTime] = useState(
    train?.departureTime || ""
  );

  const [arrivalTime, setArrivalTime] = useState(
    train?.arrivalTime || ""
  );

  const [availableSeats, setAvailableSeats] = useState(
    train?.availableSeats || ""
  );

  const updateTrain = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/trains/${train._id}`,
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

      alert("🚆 Train Updated Successfully");

      window.location.href =
        "/view-trains";
    } catch (error) {
      console.log(error);

      alert("Failed To Update Train");
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
          display: "flex",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            width: "700px",
            background:
              "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
            padding: "35px",
            boxShadow:
              "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            🚆 Edit Train Details
          </h1>

          <input
            type="text"
            value={trainNumber}
            onChange={(e) =>
              setTrainNumber(e.target.value)
            }
            placeholder="Train Number"
            style={inputStyle}
          />

          <input
            type="text"
            value={trainName}
            onChange={(e) =>
              setTrainName(e.target.value)
            }
            placeholder="Train Name"
            style={inputStyle}
          />

          <input
            type="text"
            value={source}
            onChange={(e) =>
              setSource(e.target.value)
            }
            placeholder="Source Station"
            style={inputStyle}
          />

          <input
            type="text"
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
            placeholder="Destination Station"
            style={inputStyle}
          />

          <input
            type="text"
            value={departureTime}
            onChange={(e) =>
              setDepartureTime(
                e.target.value
              )
            }
            placeholder="Departure Time"
            style={inputStyle}
          />

          <input
            type="text"
            value={arrivalTime}
            onChange={(e) =>
              setArrivalTime(
                e.target.value
              )
            }
            placeholder="Arrival Time"
            style={inputStyle}
          />

          <input
            type="number"
            value={availableSeats}
            onChange={(e) =>
              setAvailableSeats(
                e.target.value
              )
            }
            placeholder="Available Seats"
            style={inputStyle}
          />

          <button
            onClick={updateTrain}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background:
                "linear-gradient(90deg,#16a34a,#22c55e)",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              marginTop: "15px",
            }}
          >
            ✅ Update Train
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
};

export default EditTrain;