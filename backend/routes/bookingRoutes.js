const express = require("express");

const router = express.Router();

const {
  createBooking,
  getUserBookings,
  cancelBooking,
  getBookingByPNR,
} = require("../controllers/bookingController");

router.post("/book", createBooking);

router.get("/pnr/:pnrNumber", getBookingByPNR);

router.get("/:userId", getUserBookings);

router.put("/cancel/:bookingId", cancelBooking);

module.exports = router;