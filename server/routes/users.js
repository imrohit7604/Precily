const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const countAPICall = require("../middleware/countAPICall");

//End Point for get specfic user details
router.get("/", countAPICall, async (req, res) => {
  // const user = await User.findById(req.user._id)  ;
  const email = req.query.email;
  const contact = req.query.contact;
  let user;
  user = await User.findOne({ email: email });
  if (!user) user = await User.findOne({ contact: contact });
  res.send("rohit");
});

//End Point for create a new user
router.post("/", countAPICall, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  user = await User.findOne({ contact: req.body.contact });

  if (user) return res.status(400).json({ error: "User already registered." });

  user = new User(_.pick(req.body, ["name", "email", "contact"]));
  await user.save();
  res.status(201).json({ message: "Saved Successfully!!" });
});

//End Point for update  user
router.put("/", countAPICall, async (req, res) => {
  const { id } = req.body;
  const { error } = validate(_.pick(req.body, ["name", "email", "contact"]));
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user == null) return res.status(404).json({ error: "User not found." });

  let newUser = await User.findByIdAndUpdate(id, {
    name: req.body.name,
    contact: req.body.contact,
  });
  res.status(200).json({ message: "Updated Successfully!!" });
});

module.exports = router;
