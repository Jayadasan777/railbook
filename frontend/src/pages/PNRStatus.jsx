import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function PNRStatus() {
  const [pnr, setPnr] = useState("");
  const [booking, setBooking] = useState(null);

  const searchPNR = async () => {
    try {
      const res = await axios.get(
        `https://railbook-c0ws.onrender.com/api/bookings/pnr/${pnr}`
      );

      setBooking(res.data);
    } catch (error) {
      alert("PNR Not Found");
      setBooking(null);
    }
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          minHeight: "90vh",
          padding: "40px",
          background:
            "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
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
          🚆 PNR Status Enquiry
        </h1>

        {/* SEARCH BOX */}

        <div
          style={{
            maxWidth: "600px",
            margin: "auto",
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            color: "black",
            boxShadow:
              "0 5px 20px rgba(0,0,0,.3)",
          }}
        >
          <h2>Check Your Ticket Status</h2>

          <br />

          <input
            type="text"
            placeholder="Enter PNR Number"
            value={pnr}
            onChange={(e) =>
              setPnr(e.target.value)
            }
          />

          <br />
          <br />

          <button
            style={{
              background: "#1e3a8a",
              color: "white",
              width: "220px",
            }}
            onClick={searchPNR}
          >
            Search PNR
          </button>
        </div>

        {/* RESULT CARD */}

        {booking && (
          <div
            style={{
              maxWidth: "850px",
              margin: "30px auto",
              background: "white",
              color: "black",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow:
                "0 5px 20px rgba(0,0,0,.3)",
            }}
          >
            <div
              style={{
                background:
                  booking.bookingStatus ===
                  "Cancelled"
                    ? "#dc2626"
                    : "#1e3a8a",

                color: "white",
                padding: "15px",
              }}
            >
              <h2>
                🚆{" "}
                {
                  booking.trainId
                    ?.trainName
                }
              </h2>
            </div>

            <div
              style={{
                padding: "25px",
              }}
            >
              <h3>
                Passenger Details
              </h3>

              <p>
                <strong>
                  Passenger Name:
                </strong>{" "}
                {
                  booking.passengerName
                }
              </p>

              <p>
                <strong>
                  Train Number:
                </strong>{" "}
                {
                  booking.trainId
                    ?.trainNumber
                }
              </p>

              <p>
                <strong>
                  Seat Number:
                </strong>{" "}
                {
                  booking.seatNumber
                }
              </p>

              <p>
                <strong>
                  PNR Number:
                </strong>{" "}
                {
                  booking.pnrNumber
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                <span
                  style={{
                    color:
                      booking.bookingStatus ===
                      "Cancelled"
                        ? "red"
                        : "green",
                    fontWeight:
                      "bold",
                  }}
                >
                  {
                    booking.bookingStatus
                  }
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PNRStatus;
