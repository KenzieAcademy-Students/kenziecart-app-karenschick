import express from "express";
import { Coupon } from "../models";

const router = express.Router();

router
  .get("/create", async (req, res, next) => {
    const couponCode = req.query.couponCode;
    const couponDiscount = req.query.couponDiscount;

    try {
      await Coupon.create({couponCode, couponDiscount})
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send("error");
    }
  })

  .get("/verify", async (req, res, next) => {
    const couponCode = req.query.couponCode;
    const couponDiscount = req.query.couponDiscount;

    try {
      const veryifyCoupon = await Coupon.findOne({couponCode})
      if (!veryifyCoupon){ 
        return res.sendStatus(404)
      }
      res.send({
        couponDiscount: veryifyCoupon.couponDiscount,
      });
    } catch (error) {
      res.status(404).send("error");
    }
  });
module.exports = router;
