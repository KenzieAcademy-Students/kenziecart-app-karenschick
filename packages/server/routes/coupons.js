import express from "express";
import { Coupon } from "../models";

const router = express.Router();

router
  .get("/create", async (req, res, next) => {
    const couponCode = req.query.couponCode;
    const couponDiscount = req.query.couponDiscount;
     
    
    res.send({
      couponCode: couponCode,
      couponDiscount: couponDiscount,
    });
  })

  .get("/verify", async (req, res, next) => {
    const couponCode = req.query.couponCode;
    const couponDiscount = req.query.couponDiscount;

    res.send({
      couponCode: couponCode,
      couponDiscount: couponDiscount,
    });
    //error 404
  });
module.exports = router;
