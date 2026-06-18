const Train = require("../models/Train");

// ADD TRAIN
const addTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);

    res.status(201).json({
      message: "Train Added Successfully",
      train,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Train Number Already Exists",
      });
    }

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// SEARCH TRAINS
const searchTrains = async (req, res) => {
  try {
    const { source, destination } = req.query;

    const trains = await Train.find({
      source,
      destination,
    });

    res.status(200).json(trains);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET ALL TRAINS
const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();

    res.status(200).json(trains);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// DELETE TRAIN
const deleteTrain = async (req, res) => {
  try {
    await Train.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Train Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE TRAIN
const updateTrain = async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Train Updated Successfully",
      train,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addTrain,
  searchTrains,
  getAllTrains,
  deleteTrain,
  updateTrain,
};