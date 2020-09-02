import express from 'express';
import Order from '../models/orderModel.mjs';
import Product from '../models/productModel.mjs';
import { isAuth, isAdmin } from '../util.mjs';
import { getRequest, decodeResponse } from '../payment/order.mjs';

const router = express.Router();

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  }
  catch(error) {
    res.status(404).send("Something went wrong");
  }
});

router.get("/:id", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.id });
    res.send(orders);
  }
  catch(error) {
    res.status(404).send("Something went wrong");
  }
});

router.get("/getorder/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send({order});
  }
  catch(error) {
    res.status(404).send("Something went wrong");
  }
});

router.post("/", async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.body.userID,
      cartItems: req.body.cartItems,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      country: req.body.country,
      destinationName: req.body.destinationName,
      destinationPhone: req.body.destinationPhone,
      destinationAddress: req.body.destinationAddress,
      destinationRegion: req.body.destinationRegion,
      date: req.body.date,
      hour: req.body.hour,
      anonym: req.body.anonym,
      facturare: req.body.facturare,
      methoddelivery: req.body.methoddelivery,
      payment: req.body.payment,
      comments: req.body.comments,
      totalPrice: req.body.totalPrice,
      companyName: req.body.companyName,
      cui: req.body.cui
    });
    const newOrderCreated = await newOrder.save();
    try {
        asyncForEach(newOrderCreated.cartItems, async (product) => {
          const prod = await Product.findById(product.product);
          if(prod) {
            prod.soldNo = prod.soldNo + product.qty;
            const newprod = await prod.save();
          }
        })
        res.status(201).send({ message: "New Order Created", data: newOrderCreated });
      
    }
    catch(err) {
      console.log(err);
    }
    
  }
  catch(err) {
    console.log(err);
  }
  });

router.get('/getpayment/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(201).send(getRequest(order._id, order.totalPrice, order.facturare, 
      order.firstName, order.lastName, order.address, 
      order.email, order.phone, order.destinationName, 
      order.destinationAddress, order.destinationPhone));
  }
  catch(err) {
    res.status(401).send(err);
  }
})

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.post("/confirmURL/:id", async (req, res) => {
  const orderID = req.params.id;
  const order = await Order.findById(orderID);
  if(order) {
    try {
      const resp = await decodeResponse({
        env_key: req.body.env_key,
        data: req.body.data
      })
      order.paymentErrorMessage = resp.order.mobilpay.action;
      order.paymentStatus = resp.order.mobilpay.error.$.code;
      await order.save();
      res.send(resp)
    } catch (e) {
      console.error('Error decoding response')
      console.error(e.message)
      console.error(e)
      res.status(500).send()
    }
  }
});

  export default router;