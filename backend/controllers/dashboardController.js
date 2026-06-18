const Train = require("../models/Train");
const Booking = require("../models/Booking");

const getDashboardStats = async (req, res) => {
  try {
    const totalTrains = await Train.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    const trains = await Train.find();

    let totalAvailableSeats = 0;

    trains.forEach((train) => {
      totalAvailableSeats += train.availableSeats;
    });

    res.status(200).json({
      totalTrains,
      totalBookings,
      totalAvailableSeats,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};