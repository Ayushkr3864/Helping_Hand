var express = require("express");
var app = express.Router();
const userModel = require("../models/user");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const multer = require("multer");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const { isLoggedIn } = require("../middleware/isLoggedIn");
const donateModel = require("../models/donate");
var Path = require("path");
const AdminModel = require("../models/admin");
const isAdmin = require("../middleware/isadmin");
const EventModel =  require("../models/events")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + Path.extname(file.originalname));
  },
});
const upload = multer({ storage });

async function createAdmin() {
  try {
    const existingAdmin = await AdminModel.findOne({ role: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await Bcrypt.hash(process.env.PASSWORD, 10);
      const admin = AdminModel.create({
        fullName: process.env.FULL_NAME,
        email: process.env.EMAIL,
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin created successfully!");
    }
  } catch (err) {
    console.log("Error creating admin:", err);
  }
}
createAdmin();
/* GET home page. */
app.post("/api/login", async (req, res) => {
  try {
    const { Email, password } = req.body;
    console.log("login request", req.body)
    // Normal user login
    const user = await userModel.findOne({ Email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await Bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Unauthorized user" });

    const token = jwt.sign(
      { Email: user.Email, id: user._id, role: "user" },
      jwtSecret,
      { expiresIn: "2h" }
    );
    return res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

// Admin Login Route
app.post("/api/admin/login", async (req, res) => {
  try {
    const { Email, password } = req.body;
    console.log("Login request:", req.body);

    // Check if email matches the admin email stored in .env
    if (Email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    // Compare password with stored hash in .env
    const isMatch = await Bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { role: "admin", email: Email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful ✅", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/register", upload.single("profileImg"), async (req, res) => {
  try {
    const {
      fullName,
      Phone,
      Email,
      Age,
      Address,
      Availability,
      Interest,
      password,
    } = req.body;
    const profileImg = req.file ? req.file.filename : null;
    const salt = await Bcrypt.genSalt(10);
    const hashPassword = await Bcrypt.hash(password, salt);
    console.log(req.body);
    const userEmail = await userModel.findOne({ Email });
    if (userEmail) {
      return res.json({ message: "user exist" });
    } else {
      const userCreated = await userModel.create({
        fullName,
        Phone,
        Email,
        Age,
        Address,
        Availability,
        Interest,
        password: hashPassword,
        profileImg,
      });
      res.status(200).json({
        userCreated: {
          ...userCreated._doc,
          profileImg: `http://localhost:3000${profileImg}`,
        },
        message: "register successful",
      });
    }
  } catch (err) {
    res.status(500).json({ message: `error form register ${err}` });
  }
});
app.get("/user", isLoggedIn, async (req, res) => {
  try {
    const userData = req.user;
    const user = await userModel.findOne({ Email: userData.Email });
    if (!user) {
      return res.send("no user found");
    } else {
      return res.status(200).json({
        user: user,
        profileImg: user.profileImg
          ? `http://localhost:3000/uploads/${user.profileImg}`
          : null,
      });
    }
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});
app.post("/Donate", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ Email: req.user.Email });
  console.log(user);
  const { Phone, DonationType, Amount, itemName } = req.body;
  console.log(req.body);

  const Donated = await donateModel.create({
    Phone,
    DonationType,
    Amount,
    itemName,
    user: req.user.id,
  });
  res.json({ donated: Donated });
  // user.Donate.push(Donated._id)
  await user.save();
});
app.get("/find/donate", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ Email: req.user.Email });
    if (!user) {
      return res.status(401).json({ message: "unauthorised user" });
    }
    console.log(user._id);

    if (!user._id) {
      return res
        .status(500)
        .json({ message: "User ID not found for aggregation." });
    } else {
      // const donation = await donateModel.find({user:user.id});
      // res.status(200).json({Donated:donation})
      const donations = await donateModel.aggregate([
        {
          $match: { user: user._id },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $unwind: "$userDetails" },
        {
          $group: {
            _id: "$user", // group by user
            totalAmount: { $sum: "$Amount" }, // total donated amount
            donations: {
              $push: {
                // list of all donations
                _id: "$_id",
                DonationType: "$DonationType",
                Amount: "$Amount",
                itemName: "$itemName",
                createdAt: "$donatedAt",
                user: "$userDetails.fullName",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalAmount: 1,
            donations: 1,
          },
        },
      ]);
      const lastDonated = await donateModel
        .findOne({ user: user._id })
        .sort({ donatedAt: -1 })
        .limit(1);
      const summary =
        donations.length > 0 ? donations[0] : { totalAmount: 0, donations: [] };
      res.status(201).json({
        summary: summary,
        lastDonated: lastDonated,
      });
    }
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }
});
app.post("/add/events", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { name, date, description } = req.body;
    console.log(req.body);
    
    const newEvent = await EventModel.create({
      name,
      date,
      description,
    });

    res
      .status(201)
      .json({ event: newEvent, message: "Event created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/allEvents", isLoggedIn,async (req, res) => {
  try {
    const user = await userModel.findOne({ Email: req.user.Email })
  if (!user) {
    return res.status(401).json({message:"unauthorised user"})
  }
  else {
    const events = await EventModel.find();
    res.status(200).json({Events:events})
  }
  } catch (e) {
    return res.status(400).json({error:e.message})
  }
})
app.get("/events", isLoggedIn, async (req, res) => {
  try {
    // Check if the user exists in DB
    const user = await userModel.findOne({ Email: req.user.Email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorised user ❌" });
    }

    // Fetch all events sorted by date
    const events = await EventModel.find().sort({ date: 1 });
    res.status(200).json(events); // send events to frontend
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Server error ⚠️" });
  }
});

module.exports = app;
