import { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import Navbar from "../components/Navbar";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const userId =
        localStorage.getItem("userId");

      const res = await axios.get(
        `https://railbook-c0ws.onrender.com/api/bookings/${userId}`
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed To Load Bookings");
    }
  };

  const downloadTicket = async (booking) => {
    const doc = new jsPDF();

    const qrData = `
PNR: ${booking.pnrNumber}
Passenger: ${booking.passengerName}
Train: ${booking.trainId?.trainName}
Seat: ${booking.seatNumber}
Status: ${booking.bookingStatus}
`;

    const qrImage =
      await QRCode.toDataURL(qrData);

    doc.setFontSize(20);
    doc.text(
      "RailBook E-Ticket",
      65,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Passenger: ${booking.passengerName}`,
      20,
      50
    );

    doc.text(
      `Train: ${booking.trainId?.trainName}`,
      20,
      70
    );

    doc.text(
      `Train No: ${booking.trainId?.trainNumber}`,
      20,
      90
    );

    doc.text(
      `Seat: ${booking.seatNumber}`,
      20,
      110
    );

    doc.text(
      `PNR: ${booking.pnrNumber}`,
      20,
      130
    );

    doc.text(
      `Status: ${booking.bookingStatus}`,
      20,
      150
    );

    doc.addImage(
      qrImage,
      "PNG",
      140,
      40,
      45,
      45
    );

    doc.save(
      `Ticket-${booking.pnrNumber}.pdf`
    );
  };

  const cancelTicket = async (
    bookingId
  ) => {
    try {
      await axios.put(
        `https://railbook-c0ws.onrender.com/api/bookings/cancel/${bookingId}`
      );

      alert(
        "Ticket Cancelled Successfully"
      );

      fetchBookings();
    } catch (error) {
      console.log(error);

      alert(
        "Failed To Cancel Ticket"
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
            "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url('https://images.unsplash.com/photo-1519003722824-194d4455a60c')",
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
          🎟 My Tickets
        </h1>

        {bookings.length === 0 ? (
          <h2
            style={{
              textAlign: "center",
            }}
          >
            No Bookings Found
          </h2>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                maxWidth: "900px",
                margin: "20px auto",
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

                <p>
                  PNR:
                  {" "}
                  {
                    booking.pnrNumber
                  }
                </p>
              </div>

              <div
                style={{
                  padding: "20px",
                }}
              >
                <h3>
                  Passenger Details
                </h3>

                <p>
                  <strong>
                    Name:
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

                <br />

                <button
                  style={{
                    background:
                      "#1e3a8a",
                    color:
                      "white",
                    marginRight:
                      "10px",
                  }}
                  onClick={() =>
                    downloadTicket(
                      booking
                    )
                  }
                >
                  📄 Download Ticket
                </button>

                {booking.bookingStatus !==
                  "Cancelled" && (
                  <button
                    style={{
                      background:
                        "#dc2626",
                      color:
                        "white",
                    }}
                    onClick={() =>
                      cancelTicket(
                        booking._id
                      )
                    }
                  >
                    ❌ Cancel Ticket
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;
