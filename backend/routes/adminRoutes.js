const express = require("express");
const adminController = require("../controller/adminControler");

const router = express.Router();

router.get("/", adminController.getPackages);
router.post("/", adminController.createPackages);
router.put("/:id", adminController.editPackages);
router.delete("/:id", adminController.deletePackage);

module.exports = router;
