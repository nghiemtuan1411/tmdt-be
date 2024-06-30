const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
