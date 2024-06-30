const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    note: {
      type: String,
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    isPayment: {
      // 1:not-payment, 2:payment
      type: Number,
      default: 1,
    },

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        amount: { type: Number },
        type1: { type: String },
        type2: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
