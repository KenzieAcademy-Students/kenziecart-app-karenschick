import express from "express";
import { Coupon } from "../models";

const router = express.Router();

router
  .get("/",async (req, res, next) => {
    const coupons = await Coupon.find();
    res.send(coupons);
  })
  

module.exports = router;