const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const { registerCheck, loginCheck, validator } = require('../middlewares/validator')
const upload = require('../utils/multer')


//register new user

router.post("/register", registerCheck(), validator, async (req, res) => {
    const { email, password, role } = req.body
    try {
        if (role) {
            return res.status(401).send({ msg: "Not authorized !!" })
        }
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).send({ msg: "User exists ,please login" })
        }
        const newUser = new User(req.body)
        const hashedPassword = await bcrypt.hash(password, 10)
        newUser.password = hashedPassword
        await newUser.save()
        res.send({ msg: "User added successfully", user: newUser })
    } catch (error) {
        console.log(error);
    }
})

//login user 

router.post('/login', loginCheck(), validator, async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).send({ msg: "Bad credential !!" })
        }
        const isMatched = await bcrypt.compare(password, existUser.password)

        if (!isMatched) {
            return res.status(400).send({ msg: "Bad credential !!" })
        }
        existUser.password = undefined
        const payload = { _id: existUser._id }
        const token = jwt.sign(payload, process.env.secretKey)
        res.send({ user: existUser, token })
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: error.message })
    }
})

// get current user ==>private

router.get("/current", isAuth(), (req, res) => {
    res.send({ user: req.user });
})

//get All User  ==>protected
router.get("/users", isAuth(), (req, res, next) => {
    console.log("isAuth middleware executed");
    next();
  }, isAdmin, async(req, res) => {
    console.log("isAdmin middleware executed");
    try {
      const users = await User.find()
      res.send({ users })
    } catch (error) {
      console.log(error);
      res.status(400).send({ msg: error.message });
    }
  })
  


//update user 

router.put(
    "/editprofile/:id",
    isAuth(),
    upload("profilepicture").single("file"),
    async (req, res) => {
      try {
        console.log(req.body.name);
        console.log(req.params.id);
        const result = await User.updateOne(
          { _id: req.params.id },
          req.body
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
  
        res.status(400).send({ msg: "User aleardy updated " });
      } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
      }
    }
  );


module.exports = router