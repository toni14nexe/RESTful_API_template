const mongoose = require("mongoose");

exports.get_ping = async (req, res, next) => {
  try {
    await mongoose.connection.db.admin().ping();

    res.status(200).json({
      status: "ok",
      time: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};
