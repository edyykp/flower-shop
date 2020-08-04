import express from 'express';
import path, {dirname} from 'path';
import config from './config.mjs';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute.mjs';
import productRoute from './routes/productRoute.mjs';
import orderRoute from './routes/orderRoute.mjs';
import uploadRoute from './routes/uploadRoute.mjs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use('/api/orders', orderRoute);
app.use("/api/uploads", uploadRoute);

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build/')));
app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  });
  
app.listen(config.PORT, () => {console.log("Server started at http://localhost:"+config.PORT)});