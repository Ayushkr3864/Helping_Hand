const Mongoose = require("mongoose");
const donateSchema = Mongoose.Schema({
  Phone: { type: String, required: true },
  DonationType: { type: String, required: true },
  Amount: {
    type: Number,
    required: function () {
      return this.DonationType === "money";
    },
  },
  itemName: {
    type: String,
    required: function () {
      return this.DonationType === "item";
    },
  },
  donatedAt: {
    type: Date,
    default: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // only date, no time
      return today;
    },
  },
  user: { type: Mongoose.Schema.Types.ObjectId, ref: "user" },
});
module.exports = Mongoose.model("donate", donateSchema);
