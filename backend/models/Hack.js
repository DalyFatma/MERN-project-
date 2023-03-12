const mongoose = require("mongoose");
const beautyHackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagesrc :{type: String},
    type: { type: String, default: 'hack' },
    
    category: {
      type: String,
      required:true,
      enum: ['SKIN', 'MAKEUP', 'NAILS', 'HAIR'],
      default: 'SKIN'
    },
    
    user: { type: mongoose.Schema.Types.ObjectId,ref:"user" }
  },
  { timestamps: true }
);

const BeautyHack = mongoose.model("BeautyHack", beautyHackSchema);

module.exports = BeautyHack;
