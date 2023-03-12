 const BeautyHack = require("../models/Hack");

async function getBeautyHack(req, res, next) {
    let beautyHack;
    try {
      beautyHack = await BeautyHack.findById(req.params.id);
      if (beautyHack == null) {
        return res.status(400).send({ message: "Cannot find beauty hack" });
      }
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  
    res.beautyHack = beautyHack;
    next();
  }
  module.exports=getBeautyHack