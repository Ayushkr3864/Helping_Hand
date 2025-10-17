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
const EventModel = require("../models/events")
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { OAuth2Client } = require("google-auth-library")


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + Path.extname(file.originalname));
//   },
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary config:", cloudinary.config());


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    resource_type: "image",
    // remove 'format' to keep original file type
  },
});
// create a google client
const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
console.log("client id",process.env.GOOGLE_CLIENT_ID);

// callback route
app.post("/api/auth/google", async (req,res) => {
  const {token} = req.body
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:process.env.GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload();
    const { sub, name, email, picture } = payload;
    console.log("picture",picture);
    
    let user = await userModel.findOne({ Email: email });
    if (!user) {
      user = await userModel.create({
        Email: email,
        fullName: name,
        profileImg: picture,
        googleId: sub,
      });
    }
    console.log(user);
    
    const jwtToken = jwt.sign(
      { Email: user.Email, id: user._id, role: "user" },
      jwtSecret,
      { expiresIn: "2h" }
    );
    res.status(200).json({token:jwtToken,message:"Login Successfully",user:{profileImg: user.profileImg,}})
  } catch (e) {
    res.status(500).json({error:e.message})
   }
});
const upload = multer({ storage });

async function createAdmin() {
  try {
    const existingAdmin = await AdminModel.findOne({ role: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await Bcrypt.hash(process.env.PASSWORD, 10);
      console.log(hashedPassword);
      
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
    console.log(process.env.ADMIN_PASSWORD);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
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
app.post("/api/register", (req, res, next) => {
  upload.single("profileImg")(req, res, function (err) {
    if (err) {
      console.error("Upload error:", err);
      return res.status(400).json({ message: "Image upload failed ❌", error: err.message });
    }
    next();
  });
}, async (req, res) => {
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
      const requiredFields = [
        fullName,
        Phone,
        Email,
        Age,
        Address,
        Availability,
        Interest,
        password,
      ];
      if (requiredFields.some((field) => !field || field.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" });
      }
    
    const profileImg = req.file ? req.file.path : null;
    console.log("File received:", req.file);

    const salt = await Bcrypt.genSalt(10);
    const hashPassword = await Bcrypt.hash(password, salt);

    const userEmail = await userModel.findOne({ Email });
    if (userEmail) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

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
        profileImg,
      },
      message: "Registered successfully ✅",
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error registering user ❌", error: err.message });
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
      });
    }
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});
app.post("/Donate", isLoggedIn, async (req, res) => {
  try {
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
  res.json({
    donated: Donated,
    message: "🎉 Donation successful! Thank you for your support.",
  });
  // user.Donate.push(Donated._id)
  await user.save();
  } catch (e) {
    res.status(500).json({message:e.message})
 }
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
