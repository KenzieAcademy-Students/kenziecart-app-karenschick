import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
  },
  couponDiscount: {
    type: Number,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
