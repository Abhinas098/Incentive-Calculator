const adminModel = require("../models/adminModel");

const getPackages = (req, res) => {
  adminModel.getAllPackages((err, packages) => {
    if (err) {
      return res.status(500).json({ err: "Intern server Error" });
    }
    return res.status(201).json(packages);
  });
};

const createPackages = (req, res) => {
  const { holiday_name, duration_nights, destination, location, amenities } =
    req.body;
  adminModel.postPackages(
    {
      holiday_name,
      duration_nights,
      destination,
      location,
      amenities,
    },
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ msg: "Package created Successfully" });
    }
  );
};

const editPackages = (req, res) => {
  const { id } = req.params;
  const { holiday_name, duration_nights, destination, location, amenities } =
    req.body;
  adminModel.updatePackageById(
    { holiday_name, duration_nights, destination, location, amenities },
    id,
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal sever error" });
      }
      return res.status(201).json({ message: "Updated package successfully!" });
    }
  );
};

const deletePackage = (req, res) => {
  const { id } = req.params;
  adminModel.deletePackageById(id, (err) => {
    if (err) {
      return res.status(500).json({ error: "Internal sever error" });
    }
    return res.status(201).json({ message: "Deleted Successfully!" });
  });
};


module.exports = {
  getPackages,
  createPackages,
  editPackages,
  deletePackage,
};
