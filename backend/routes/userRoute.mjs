import express from 'express';
import User from '../models/userModel.mjs';
import { getToken, isAuth } from '../util.mjs';
import msgs from '../email.msgs.mjs';
import sendEmail from '../email.send.mjs';
import templates from '../email.templates.mjs';
import jwt from 'jsonwebtoken';
import config from '../config.mjs';
import _ from 'lodash';

const router = express.Router();

router.put('/reset-password', async (req, res) => {
  const password = req.body.password;
  const resetLink = req.body.resetLink;
  if(resetLink) {
    jwt.verify(resetLink, config.RESET_PASSWORD_KEY, function(err, decodedData)  {
      if(err) {
        return res.status(401).json({
          err: "Link incorect sau expirat"
        })
      }
      User.findOne({resetLink}, (err,user) => {
        if(err || !user) {
          return res.status(401).json({error: "Nu există un astfel de utilizator"});
        }
        const obj = {
          password: password,
          resetLink: ''
        }
        user = _.extend(user, obj);
        user.save((err, result) => {
          if(err) {
            return res.status(401).json({error: "Eroare la resetare"})
          }
          else {
            return res.status(200).json({message: "Parola a fost actualizată"});
          }
        })
      })
    })
  }
  else {
    return res.status(401).json({message: "Eroare de autentificare"});
  }
})

router.put('/forgotPass', async (req, res) => {
  const email = req.body.email;

  User.findOne({email}, (err, user) => {
    if(err || !user) {
      
      return res.status(400).json({error: "Acest utilizator nu există"});
    }
    const token = jwt.sign({_id: user._id}, config.RESET_PASSWORD_KEY, {expiresIn: "20m"});
    
    return user.updateOne({resetLink: token}, function(err, success) {
      if(err) {
        return res.status(400).json({error: "Eroare la resetarea parolei"});
      } else {
        try {
          sendEmail(email, templates.forgotpassword(token));
          return res.json({message : "Email trimis cu succes"});
        }
        catch(error) {
          res.json({error: error.message});
        }
      }
    })
  })
  
});

router.put('/contact', async (req, res) => {
  try {
    sendEmail(config.MAIL_USER, templates.contactus(req.body.name, req.body.email, req.body.phone, req.body.subject, req.body.message));
    return res.json({message : "Email trimis cu succes"});
  }
  catch(error) {
    res.json({error: error.message});
  }

  
});

router.put('/updatePass/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.password = req.body.newPassword;
    const updatedUser = await user.save();
    res.send({_id: updatedUser.id,
      password: updatedUser.password,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      companyName: updatedUser.companyName,
      cui: updatedUser.cui,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.put('/updateUser/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.firstName = req.body.firstName;
    user.email = req.body.email;
    user.lastName = req.body.lastName;
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.companyName = req.body.companyName;
    user.cui = req.body.cui;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      password: updatedUser.password,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
      companyName: updatedUser.companyName,
      cui: updatedUser.cui,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

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
          password: signinUser.password,
          isAdmin: signinUser.isAdmin,
          address: signinUser.address,
          companyName: signinUser.companyName,
          cui: signinUser.cui,
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