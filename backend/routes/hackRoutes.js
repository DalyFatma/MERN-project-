const express = require("express");
const router = express.Router();
const BeautyHack = require("../models/Hack");
const isAuth = require("../middlewares/isAuth");
const upload = require("../utils/multer");

// Create a beauty hack
router.post(
  "/hack",
  isAuth(),
  upload("hacks").single("file"),
  async (req, res) => {
    try {
      const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      const newHack = new BeautyHack({ ...req.body, user: req.user._id });
      newHack.imagesrc = url;

      await newHack.save();
      res.send({ msg: "hack  added successfully", hack: newHack });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);

// Get all beauty hacks
router.get("/hacks", async (req, res) => {
  try {
    const hacks = await BeautyHack.find({
      name: { $regex: req.query.name || "", $options: "i" },
    })
      .sort({ createOn: -1 })
      .populate("user", "title");
    res.send(hacks);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// Update a beauty hack
router.put(
  "/:id",
  isAuth(),
  upload("hacks").single("file"),
  async (req, res) => {
    try {
      const result = await BeautyHack.updateOne(
        { _id: req.params.id },
        { ...req.body }
      );
      HackUpdated = await BeautyHack.findOne({ _id: req.params.id });

      if (req.file) {
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
        HackUpdated.imagesrc = url;
        await HackUpdated.save();
      }
      console.log(result);
      if (result.modifiedCount || req.file) {
        return res.send({ msg: "update suuccess", hack: HackUpdated });
      }

      res.status(400).send({ msg: " aleardy update " });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);
//get one hack
router.get("/:id", async (req, res) => {
  try {
    const oneHack = await BeautyHack.findById(req.params.id);
    res.send({ hack: oneHack });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//delete hack
router.delete("/:id", isAuth(), async (req, res) => {
  try {
    const result = await BeautyHack.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      return res.send({ msg: "Hack deleted successfully" });
    }
    res.status(400).send({ msg: "Hack aleardy deleted" });
  } catch (error) {
    console.log(error);

    res.status(400).send(error.message);
  }
});

module.exports = router;
