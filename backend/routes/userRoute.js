import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';
import msgs from '../email.msgs';
import sendEmail from '../email.send';
import templates from '../email.templates';

const router = express.Router();

router.post('/signin', async (req, res) => {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (signinUser) {
      if(signinUser.confirmedEmail === true) {
        res.send({
          _id: signinUser.id,
          firstName: signinUser.firstName,
          lastName: signinUser.lastName,
          phone: signinUser.phone,
          email: signinUser.email,
          isAdmin: signinUser.isAdmin,
          token: getToken(signinUser),
        });
      }
      else {
        res.status(401).send({message: "Adresa de email nu a fost confirmată"});
      }
      
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
        try {
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
            try {
              sendEmail(newUser.email, templates.confirm(newUser._id));
            }
            catch(error) {
              console.log(error.message);
            }            
          }else {
            res.status(401).send({ message: 'Invalid User Data.' });
          }
        }
        catch(error) {
          res.status(500).send({message: "Această adresă de mail este deja utilizată."});
        }
       
  });

  router.put('/confirmemail/:id', async (req, res) => {
    const  id  = req.params.id;
    const user = await User.findById(id);
      if (!user) {
        res.send({ msg: msgs.couldNotFind })
      }
      else if (user && !user.confirmedEmail) {
          user.confirmedEmail = true;
          const updatedUser = await user.save();
          res.send({ msg: msgs.confirmed });
        }
        else  {
          res.send({ msg: msgs.alreadyConfirmed });
        }
  });

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            firstName: "Eduard",
            lastName: "Stoica",
            email: "eduard.c.stoica10@gmail.com",
            password: "12345678",
            isAdmin: true,
            confirmedEmail: true
        });
    
        const newUser = await user.save();
        res.send(newUser);
    }
    catch(error) {
        res.send({msg: error.message});
    }
});

export default router;