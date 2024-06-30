const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const orderRouter = require("./order.router");
const commentRouter = require("./comment.router");

const errorHandle = require("../middlewares/errorHandle");

module.exports = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/product", productRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/comment", commentRouter);

  app.use(errorHandle);
};
