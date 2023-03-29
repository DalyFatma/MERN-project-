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
//get user history activity
router.get("/:id/activity", isAuth(), isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!Array.isArray(user.activityHistory)) {
      res.status(400).send('Invalid activity history');
      return;
    }
    const activityHistory = user.activityHistory.filter((activity) => {
      return activity.type === 'add' || activity.type === 'edit' || activity.type === 'delete';
    });
    res.send(activityHistory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
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


  //banned user 
  
router.put('/:id/ban', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { isBanned: true } },
      { new: true }
    );

    res.send({ msg: 'User has been banned', user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//unbanned user 

router.put('/:id/unban', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { isBanned: false } },
      { new: true }
    );

    res.send({ msg: 'User has been unbanned', user });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});


//ADD USER 

router.post(
  "/user",
  isAuth(),
  upload("pictureprofile").single("file"),
  async (req, res) => {
    try {
      const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      const newUser = new User({ ...req.body, user: req.user._id });
      newUser.profilePicture = url;

      await newUser.save();
      res.send({ msg: "User  added successfully", user: newUser });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);

//DELETE USER 
router.delete("/:id", isAuth(), async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      return res.send({ msg: "User deleted successfully" });
    }
    res.status(400).send({ msg: "User aleardy deleted" });
  } catch (error) {
    console.log(error);

    res.status(400).send(error.message);
  }
});

module.exports = router;
