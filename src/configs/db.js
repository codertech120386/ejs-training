const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://dhaval:secret_123@cluster0.3tgdz.mongodb.net/test"
  );
};
