const express = require("express");

const jwt = require("jsonwebtoken");
const {userdata} = require("../schema");
const {productdata} = require("../schema");

// admin Login

const adminLogin = async (req, res) => {
  try {
    const email = req.body.emAil;
    const password = req.body.pass;
    if (email !== "admin" || password !== "admin123") {
      throw new Error("Invalid Email or Password");
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.setHeader("Authorization", token);
   
    res.json({ message: "welcome, Admin", token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};





module.exports = {
  adminLogin
};
