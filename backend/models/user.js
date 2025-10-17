const Mongoose = require("mongoose");
require("dotenv").config();
// Mongoose.connect("mongodb://127.0.0.1:27017/Helping_hand")
const db = process.env.MONGODB_URI;
console.log(db);
Mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("error in connection");
  });
const userSchema = Mongoose.Schema({
  googleId: String,
  fullName: { type: String },
  Phone: { type: Number },
  Email: { type: String },
  Age: { type: Number },
  Address: { type: String },
  Availability: { type: String },
  Interest: { type: String },
  password: { type: String },
  profileImg: { type: String },
  Donate: [{ type: Mongoose.Schema.Types.ObjectId, ref: "donate" }],
});
module.exports = Mongoose.model("user", userSchema);
