const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    discountPrice: {
      type: Number,
    },

    price: {
      type: Number,
    },

    label: {
      type: String,
    },

    description: {
      type: String,
    },

    struct: {
      type: String,
    },

    img1: {
      type: String,
    },

    img2: {
      type: String,
    },

    img3: {
      type: String,
    },

    img4: {
      type: String,
    },

    nameFirstType: {
      type: String,
    },

    firstType: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
