const express = require("express");
const router = express.Router();

const salesController = require("../controller/salesControler");

router.post("/", salesController.createSales);
router.get("/:userId", salesController.readSales);
router.put("/:id", salesController.updateSale);

module.exports = router;
