import React, { useState } from "react";
import usePackageApi from "./hooks/usePackageApi";
import HolidayPackageTable from "./PackageTable";
import styles from "./HolidayPackage.module.css";

const PackageManager = () => {
  const {
    holidayPackages,
    addHolidayPackage,
    editHolidayPackage,
    deleteHolidayPackage,
    loading,
    error,
  } = usePackageApi();

  const [formData, setFormData] = useState({
    holiday_name: "",
    duration_nights: "",
    destination: "",
    location: "",
    amenities: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addHolidayPackage(formData);
    setFormData({
      holiday_name: "",
      duration_nights: "",
      destination: "",
      location: "",
      amenities: "",
    });
  };

  const handleEdit = async (id, updatedData) => {
    await editHolidayPackage(id, updatedData);
  };

  const handleDelete = async (id) => {
    await deleteHolidayPackage(id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.adminInterface}>
      <div className={styles.inputCard}>
        <h2>Add New Package</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="holiday_name">Holiday Name:</label>
          <input
            type="text"
            id="holidayName"
            name="holiday_name"
            value={formData.holiday_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="duration">Duration (Nights):</label>
          <input
            type="number"
            id="duration"
            name="duration_nights"
            value={formData.duration_nights}
            onChange={handleChange}
            required
          />

          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label htmlFor="amenities">Amenities:</label>
          <input
            type="text"
            id="amenities"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Package</button>
        </form>
      </div>
      <HolidayPackageTable
        holidayPackages={holidayPackages}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default PackageManager;
