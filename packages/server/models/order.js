import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: false,
    },
    customerAddress1: {
      type: String,
      required: true,
    },
    customerAddress2: {
      type: String,
    },
    items: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    orderTotal: {
      type: Number,
      required: true,
    },
    coupon: {
      type: ObjectId,
      ref: "Coupon",
      required: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
