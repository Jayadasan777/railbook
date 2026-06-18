import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Booking() {
  const [train, setTrain] = useState(null);
  const [passengerName, setPassengerName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const selectedTrain = JSON.parse(
      localStorage.getItem("selectedTrain")
    );

    setTrain(selectedTrain);
  }, []);

  const handleBooking = async () => {
    try {
      const userId =
        localStorage.getItem("userId");

      if (!userId) {
        alert("Please Login First");
        return;
      }

      if (!train) {
        alert("Please Select A Train");
        return;
      }

      const res = await axios.post(
        "https://railbook-c0ws.onrender.com/api/bookings/book",
        {
          userId,
          trainId: train._id,
          passengerName,
          age,
          gender,
        }
      );

      alert(
        `🎟 Ticket Booked Successfully\n\nPNR Number: ${res.data.booking.pnrNumber}`
      );

      window.location.href =
        "/my-bookings";
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Booking Failed"
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          minHeight: "90vh",
          padding: "30px",
          background:
            "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('https://images.unsplash.com/photo-1474487548417-781cb71495f3')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          🚆 Train Ticket Booking
        </h1>

        {train && (
          <div
            style={{
              maxWidth: "800px",
              margin: "auto",
              background: "white",
              color: "black",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow:
                "0 5px 20px rgba(0,0,0,.3)",
            }}
          >
            {/* TRAIN DETAILS */}

            <div
              style={{
                background: "#1e3a8a",
                color: "white",
                padding: "20px",
              }}
            >
              <h2>
                🚆 {train.trainName}
              </h2>

              <p>
                Train No:
                {train.trainNumber}
              </p>
            </div>

            <div
              style={{
                padding: "25px",
              }}
            >
              <h3>
                Journey Information
              </h3>

              <hr />

              <p>
                <strong>
                  From:
                </strong>{" "}
                {train.source}
              </p>

              <p>
                <strong>
                  To:
                </strong>{" "}
                {train.destination}
              </p>

              <p>
                <strong>
                  Departure:
                </strong>{" "}
                {train.departureTime}
              </p>

              <p>
                <strong>
                  Arrival:
                </strong>{" "}
                {train.arrivalTime}
              </p>

              <p>
                <strong>
                  Available Seats:
                </strong>{" "}
                {train.availableSeats}
              </p>

              <br />

              <h3>
                Passenger Details
              </h3>

              <hr />

              <input
                type="text"
                placeholder="Passenger Name"
                value={passengerName}
                onChange={(e) =>
                  setPassengerName(
                    e.target.value
                  )
                }
              />

              <br />
              <br />

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) =>
                  setAge(
                    e.target.value
                  )
                }
              />

              <br />
              <br />

              <select
                value={gender}
                onChange={(e) =>
                  setGender(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              <br />
              <br />

              <button
                onClick={handleBooking}
                style={{
                  width: "100%",
                  background:
                    "#1e3a8a",
                  color: "white",
                  padding: "14px",
                }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
