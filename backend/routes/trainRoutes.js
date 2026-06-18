const express = require("express");

const router = express.Router();

const {
  addTrain,
  searchTrains,
  getAllTrains,
  deleteTrain,
  updateTrain,
} = require("../controllers/trainController");

// ADD TRAIN
router.post("/add", addTrain);

// SEARCH TRAINS
router.get("/search", searchTrains);

// GET ALL TRAINS
router.get("/", getAllTrains);

// UPDATE TRAIN
router.put("/:id", updateTrain);

// DELETE TRAIN
router.delete("/:id", deleteTrain);

module.exports = router;