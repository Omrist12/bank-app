// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  balance: {
    type: Number,
    required: true,
  },
  verificationCode: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

/* This code defines a Mongoose schema for a User model in a Node.js application. The schema includes fields for email,
password, phone number, verification status, balance, and a verification code. The email field is unique and required,
while the password and phone fields are also required. The isVerified field defaults to false,
and the balance field is required as well. The verificationCode field is optional.
The User model is then exported for use in other parts of the application, such as in routes or controllers.
This schema can be used to interact with a MongoDB database to perform CRUD operations on user data. */
