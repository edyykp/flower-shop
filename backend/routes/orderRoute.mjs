import express from 'express';
import Order from '../models/orderModel.mjs';
import { isAuth, isAdmin } from '../util.mjs';

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  res.send(orders);
});

router.post("/", async (req, res) => {
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
    res.status(201).send({ message: "New Order Created", data: newOrderCreated });
  });


router.put("/:id/pay", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});


router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const  id  = req.body.id;
  const order = await Order.findById(id);
    if (!order) {
      res.status(401).send({ message: "Comandă inexistentă" })
    }
    else {
        order.state = req.body.stateOrder;
        const updatedOrder = await order.save();
        res.send({ msg:  "Comandă actualizată", data: order });
    }
});
  export default router;