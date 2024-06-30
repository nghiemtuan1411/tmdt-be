const express = require("express");
const router = express.Router();

const {
  create,
  list,
  deleteData,
  addProduct,
  update,
  getById,
  home,
} = require("../controllers/comment.controller");

const asyncMiddelware = require("../middlewares/asyncHandle");

router.route("/:id").patch(asyncMiddelware(update));
router.route("/:id").delete(asyncMiddelware(deleteData));
router.route("/:id").get(asyncMiddelware(getById));
router.route("/").post(asyncMiddelware(create));
router.route("/").get(asyncMiddelware(list));

module.exports = router;
