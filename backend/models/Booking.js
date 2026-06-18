const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    trainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },

    passengerName: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    seatNumber: {
      type: String,
      required: true,
    },

    pnrNumber: {
      type: String,
      required: true,
      unique: true,
    },

    bookingStatus: {
      type: String,
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);