import express from "express";
import { getToken, isAuth } from "../util";
import User from "../../../Farm2Home/backend/Models/UserModel";
const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(signinUser.email);
    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    } else {
      res.status(401).send({ msg: "Invalid Email or Password." });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await user.save();

    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ msg: "Invalid User Data" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/createAdmin", async (req, res) => {
  try {
    const user = new User({
      name: "Harshith V",
      email: "harshithece7016@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    //console.log(user.toJSON());
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
