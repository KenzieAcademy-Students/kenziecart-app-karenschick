import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: true,
    },
    couponDiscount: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    // expirationDate: {
    //   type: Date,
    //   required: false,
    // },
  },
  // { timestamps: true }
);

// couponSchema.pre("save", function (next) {
//   this.couponCode = this.couponCode.toUpperCase();
//   next();
// });

// couponSchema.methods.isValid = function () {
//   return this.expirationDate > new Date();
// };

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
