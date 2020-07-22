import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (signinUser) {
      res.send({
        _id: signinUser.id,
        firstName: signinUser.firstName,
        lastName: signinUser.lastName,
        phone: signinUser.phone,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid Email or Password.' });
    }
  });

  router.post('/register', async (req, res) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User Data.' });
    }
  });

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            firstName: "Eduard",
            lastName: "Stoica",
            email: "eduard.c.stoica10@gmail.com",
            password: "1234",
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser);
    }
    catch(error) {
        res.send({msg: error.message});
    }
});

export default router;