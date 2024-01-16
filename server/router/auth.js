const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../models/UserSchema");

router.get("/", (req, res) => {
  res.send("Hello from the router side and WELCOME");
});

// use async-await instead of promises
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill in all the fields." });
  }

  try {
    const responseUserExist = await User.findOne({ email: email });
    if (responseUserExist) {
      return res.status(422).json({ error: "Email already exists!" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password doesn't match!" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({ message: "User registered successfully." });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please fill all the fields." });
    }

    const userFound = await User.findOne({ email: email });
    // console.log(userFound, userFound.password);

    if (userFound) {
      const passwordMatch = bcrypt.compareSync(password, userFound.password);

      if (!passwordMatch) {
        res.status(400).json({ error: "Invalid credential password." });
      } else {
        // generate jwt
        token = await userFound.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
          //expires in 30 days from logged in time.
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(200).json({ message: "User signed in successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.log(error);
  }
});

// About us page
router.get("/about", authenticate, (req, res) => {
  // console.log("from about");
  res.send(req.rootUser);
});

// Get suer data for contact us and home page
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// contact page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("Error in contact form.");
      return res.json({ error: "Please fill in all the fields." });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();
      res.status(201).json({ message: "User contact successful" });
    }
  } catch (error) {
    console.log(error);
  }
});

// logout
router.post("/logout", (req, res) => {
  // console.log("logged out");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).json({ message: "User logout successful." });
});

module.exports = router;
