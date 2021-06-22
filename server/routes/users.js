const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

//End Point for get user details
router.get("/", async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

//End Point for Sign up/create a new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: "User already registered." });

  user = new User(_.pick(req.body, ["name", "email", "contact"]));
  await user.save();
  res.json({ message: "Saved Successfully!!" });
});

module.exports = router;
