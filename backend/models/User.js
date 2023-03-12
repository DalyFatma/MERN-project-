const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, uppercase:true },
    country:{type:String,uppercase:true},

    email: { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "admin", "superAdmin"],
      default: "client",
    },
    profilePicture: {
      type: String,
    },

    contactInfo: {
      type: Number,
    },

    occupation :{type:String,uppercase:true} 
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
