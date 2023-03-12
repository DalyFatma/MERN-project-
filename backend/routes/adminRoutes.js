const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const isAdmin = require('../middlewares/isAdmin');
const BeautyHack=require('../models/Hack');
const { registerCheck,validator } = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');
const bcrypt = require('bcrypt');
const upload = require('../utils/multer');


router.post("/register-admin", registerCheck(), validator, async (req, res) => {
  const { email, password } = req.body
  try {
      const existAdmin = await User.findOne({ email })
      if (existAdmin) {
          return res.status(400).send({ msg: "Admin already exists, please login" })
      }
      const newAdmin = new User({
        ...req.body,
        role: "admin" // Set role to "admin" for new admin user
      })
      const hashedPassword = await bcrypt.hash(password, 10)
      newAdmin.password = hashedPassword
      await newAdmin.save()
      res.send({ msg: "Admin added successfully", admin: newAdmin })
  } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Server error" })
  }
})
// get current user ==>private

router.get("/currentadmin", isAuth(),isAdmin ,(req, res) => {
  res.send({ admin: req.user });
})


//  Get all users
router.get('/users', isAuth() ,isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({msg: err.message});
  }
});

//edit User profile 

router.put(
  "/editadmin/:id",
  isAuth(),isAdmin,
  upload("profilepicture").single("file"),
  async (req, res) => {
    try {
      const result = await User.updateOne(
        { _id: req.params.id },
        { ...req.body }
      );
      UserUpdated = await User.findOne({ _id: req.params.id });

      if (req.file) {
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
        UserUpdated.profilePicture = url;
        await UserUpdated.save();
      }
      console.log(result);
      if (result.modifiedCount || req.file) {
        return res.send({ msg: "User updated successfully", user: UserUpdated });
      }

      res.status(400).send({ msg: " User aleardy updated " });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);
// GET CURRENT USER 

router.get("/current", isAuth(),isAdmin, (req, res) => {
  res.send({ user: req.user });
})

//GET USER BY ID

router.get("/user/:id", isAuth(), isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});


//  Create a new product
router.post('/product',isAuth() ,isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    rating: req.body.rating,
    imagesrc: req.body.imagesrc,
    user: req.body.user
  });

  try {
    const newProduct = await product.save();
    res.status(200).send(newProduct);
  } catch (err) {
    res.status(400).json({msg: err.message});
  }
});

//Create a new hack
router.post('/hack', isAuth() ,isAdmin, async (req, res) => {
    const hack = new BeautyHack({
      title: req.body.title,
      description:req.body.description,
      imagesrc: req.body.imagesrc,
      user: req.body.user
    });
  
    try {
      const newHack = await hack.save();
      res.status(200).send(newHack);
    } catch (err) {
      res.status(400).json({msg: err.message});
    }
  });

module.exports = router;
