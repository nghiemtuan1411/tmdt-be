const commentModel = require("../models/comment.model");

module.exports = {
  list: async (req, res) => {
    try {
      const data = await commentModel
        .find({})
        .sort({ createdAt: -1 })
        .populate("product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  getById: async (req, res) => {
    try {
      const data = await commentModel
        .find({ product: req?.params?.id })
        .populate("product")
        .populate("user")
        .sort({ createdAt: -1 });
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      const createData = await commentModel.create(req.body);
      const data = await commentModel
        .findOne({ _id: createData._id })
        .populate("user")
        .populate("product");
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await commentModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        { new: true }
      );

      return res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  deleteData: async (req, res) => {
    try {
      await commentModel.findOneAndDelete({ _id: req.params.id });
      res.status(201).json("Xóa data thành công");
    } catch (error) {
      throw error;
    }
  },
};
