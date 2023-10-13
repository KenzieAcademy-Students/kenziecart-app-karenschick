import express from "express";
import { Coupon } from "../models";

const router = express.Router();

router
  .get("/create", async (req, res) => {
    const { code, discount, exp } = req.query;
    //const discount = req.query;

    if (!code || !discount)
      return res.status(422).json({ error: "provide a code and discount" });

    try {
      const queryParams = { code, discount };
      if (exp) queryParams.expirationDate = new Date(exp);
      await Coupon.create(queryParams);
      res.sendStatus(200);
    } catch (error) {
      res.status(500);
    }
  })

  .get("/verify", async (req, res) => {
    const { code, discount } = req.query;
    // const code = req.query.code;
    // const discount = req.query.discount;

    try {
      const veryifyCoupon = await Coupon.findOne({ code:code.toUpperCase() });
      if (!veryifyCoupon) {
        return res.sendStatus(404);
      }
      res.send({
        discount: veryifyCoupon.discount,
        code: veryifyCoupon.code
      });
    } catch (error) {
      res.status(404).send("error");
    }
  });
module.exports = router;

export default router;
