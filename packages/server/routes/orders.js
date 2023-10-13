import express from "express";
import { Order, Coupon } from "../models";

const router = express.Router();

router
  .route("/")
  .all((req, res, next) => {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(async (req, res, next) => {
    const orders = await Order.find();
    res.send(orders);
  })
  .post(async (req, res, next) => {
    const {
      customerDetails: { firstName, lastName, email, address1, address2 },
      items,
      orderTotal,
      coupon,
    } = req.body;
    const itemIdList = items.map((i) => i._id);
    const orderData = {
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      customerAddress1: address1,
      customerAddress2: address2,
      items: itemIdList,
      orderTotal: orderTotal,
      coupon,
    };
    try {
      if (coupon) {
        const couponnnn = await Coupon.findOne({ code: coupon.code });
        orderData.coupon = couponnnn;
      }
      /* create new order using Order model
        and return order ID
      */
      const newOrder = await Order.create(orderData);
      res.json(newOrder);
    } catch (error) {
      console.log(error);
      next(new Error("Error Placing Order"));
    }
  })
  .delete((req, res, next) => {
    next(new Error("not implemented"));
  });

module.exports = router;
