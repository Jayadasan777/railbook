
const Booking = require("../models/Booking");
const Train = require("../models/Train");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const {
      userId,
      trainId,
      passengerName,
      age,
      gender,
    } = req.body;

    const train = await Train.findById(trainId);

    if (!train) {
      return res.status(404).json({
        message: "Train Not Found",
      });
    }

    if (train.availableSeats <= 0) {
      return res.status(400).json({
        message: "No Seats Available",
      });
    }

    const seatNumber =
      "S" + (500 - train.availableSeats + 1);

    const pnrNumber =
      "PNR" + Date.now();

    const booking = await Booking.create({
      userId,
      trainId,
      passengerName,
      age,
      gender,
      seatNumber,
      pnrNumber,
    });

    train.availableSeats =
      train.availableSeats - 1;

    await train.save();

    res.status(201).json({
      message: "Ticket Booked Successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET USER BOOKINGS
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({
      userId,
    }).populate("trainId");

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// CANCEL BOOKING
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(
      bookingId
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found",
      });
    }

    booking.bookingStatus = "Cancelled";

    await booking.save();

    const train = await Train.findById(
      booking.trainId
    );

    if (train) {
      train.availableSeats =
        train.availableSeats + 1;

      await train.save();
    }

    res.status(200).json({
      message: "Ticket Cancelled Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// PNR SEARCH
const getBookingByPNR = async (req, res) => {
  try {
    const { pnrNumber } = req.params;

    const booking = await Booking.findOne({
      pnrNumber,
    }).populate("trainId");

    if (!booking) {
      return res.status(404).json({
        message: "PNR Not Found",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  cancelBooking,
  getBookingByPNR,
};
