const salesModel = require("../models/salesModel");

function createSales(req, res) {
  const { totalSales, userId } = req.body;

  // --------------> Add Sales
  salesModel.createSales(totalSales, userId, (err) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ message: "Created successfully" });
  });
}

  // ------------------> Get Sales
function readSales(req, res) {
  const { userId } = req.params;
  console.log(userId);

  salesModel.getSalesByUserId(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
}

  // -------------------> Update Sales
function updateSale(req, res) {
  const { id } = req.params;
  const { totalSales } = req.body;

  salesModel.updateSalesById(totalSales, id, (err) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "Sales updated successfully" });
  });
}


module.exports = {
  createSales,
  readSales,
  updateSale,
};
