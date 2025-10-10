const mongoose = require("mongoose")
const adminSchema =  mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "donor", "volunteer"],
    default: "donor",
  },
});
module.exports = mongoose.model("admin",adminSchema)
