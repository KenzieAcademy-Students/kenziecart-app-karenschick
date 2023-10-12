import express from "express";
import { Coupon } from "../models";

const router = express.Router();

router
  .get("/create", async (req, res, next) => {
    const couponCode = req.query.couponCode;
    const couponDiscount = req.query.couponDiscount;

    try {
      res.send({
        couponCode: couponCode,
        couponDiscount: couponDiscount,
      });
    } catch (error) {
      res.status(404).send("error");
    }
  })

  .get("/verify", async (req, res, next) => {
    const couponCode = req.query.couponCode;
    const couponDiscount = req.query.couponDiscount;

    try {
      res.send({
        couponCode: couponCode,
        couponDiscount: couponDiscount,
      });
    } catch (error) {
      res.status(404).send("error");
    }
  });
module.exports = router;
