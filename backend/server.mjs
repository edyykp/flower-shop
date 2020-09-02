import express from 'express';
import path, {dirname} from 'path';
import config from './config.mjs';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.mjs';
import productRoute from './routes/productRoute.mjs';
import orderRoute from './routes/orderRoute.mjs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { uploadImage } from './routes/uploadRoute.mjs';
import {verifyRecaptcha} from './helpers/recaptcha.mjs';
import rateLimit from 'express-rate-limit';

const __dirname = dirname(fileURLToPath(import.meta.url));

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));


const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100 
});

const app = express();
app.use("/api/", apiLimiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.disable('x-powered-by');
app.use(multerMid.single('image'));
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use('/api/orders', orderRoute);
app.post('/api/uploads', async (req, res, next) => {
  try {
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);
    res.send(imageUrl);
  } catch (error) {
    next(error)
  }
})
app.post('/api/recaptcha', (req, res, next) => {
	
  const recaptchaData = {

    remoteip: req.connection.remoteAddress,

    response: req.body.recaptchaToken,

    secret: config.RECAPTCHA_SECRET_KEY,

  };


  return verifyRecaptcha(recaptchaData)

    .then(() => {
      res.send("success");

    })
    .catch((err) => {
      console.log(err);
    })

});

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "/../frontend/build/index.html"));
  });
  
app.listen(config.PORT, () => {console.log("Server started at http://localhost:"+config.PORT)});
