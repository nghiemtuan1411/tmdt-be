const productModel = require("../models/product.model");
const categoryModel = require("../models/category.model");
const mongoose = require("mongoose");

module.exports = {
  list: async (req, res) => {
    try {
      let query = {};
      query = {
        ...(req?.query?.isNew && {
          isNew: req.query.isNew,
        }),
        ...(req?.query?.name && {
          name: { $regex: req.query.name, $options: "i" },
        }),
      };
      const data = await productModel.find(query).sort({ createdAt: -1 });
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  related: async (req, res) => {
    try {
      const categories = await categoryModel
        .find({
          product: mongoose.Types.ObjectId(req.params.id),
        })
        .populate("product");

      const arrProduct = [];
      categories.map((i) => {
        arrProduct.push([...i?.product]);
      }, []);

      const flatArrProduct = arrProduct.flat();

      const relatedProduct = flatArrProduct.filter(
        (i) => i?._id != req.params.id
      );

      const uniqueArray = [...new Set(relatedProduct)];

      const shuffleArray = (arr) => {
        const shuffledArray = [...arr];

        for (let i = shuffledArray?.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
          ];
        }

        return shuffledArray;
      };

      return res.status(201).json(shuffleArray(uniqueArray));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getTopView: async (req, res) => {
    try {
      const data = await productModel.find({}).sort({ views: -1 }).limit(8);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  update: async (req, res) => {
    try {
      const data = await productModel.findByIdAndUpdate(
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

  addViews: async (req, res) => {
    try {
      const data = await productModel.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true }
      );

      return res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    try {
      const data = await productModel.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await productModel.findOneAndDelete({ _id: req.params.id });
      const categories = await categoryModel.find();
      for (const category of categories) {
        const listProduct = category?.product?.toString()?.split(",");

        if (listProduct.includes(req.params.id)) {
          category.product = listProduct.filter((id) => id !== req.params.id);
          await category.save();
        }
      }
      res.status(201).json("Xóa product thành công");
    } catch (error) {
      throw error;
    }
  },

  getById: async (req, res) => {
    try {
      const categories = await categoryModel.find({
        product: mongoose.Types.ObjectId(req.params.id),
      });

      const listCategory = categories?.map((e) => e?.name);

      const data = await productModel.findOne({ _id: req.params.id });

      res.status(201).json({ ...data.toObject(), listCategory });
    } catch (error) {
      throw error;
    }
  },
};
