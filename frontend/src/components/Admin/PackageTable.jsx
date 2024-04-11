import React, { useState } from "react";
import styles from "./HolidayPackage.module.css";

const HolidayPackageTable = ({ holidayPackages, handleEdit, handleDelete }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const Headings = [
    "holiday_name",
    "destination",
    "duration_nights",
    "location",
    "amenities",
  ];

  const editHandler = (id, pkg) => {
    setEditMode(id);
    setEditedValues(pkg);
  };

  const updateHandler = () => {
    handleEdit(editMode, editedValues);
    setEditMode(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({ ...editedValues, [name]: value });
  };

  return (
    <div className={styles.viewCard}>
      <h2>Available Holiday Packages:</h2>
      <table>
        <thead>
          <tr>
            <th>Holiday Name</th>
            <th>Destination</th>
            <th>Duration (Nights)</th>
            <th>Location</th>
            <th>Amenities</th>
            <th>Manage </th>
          </tr>
        </thead>
        <tbody>
          {holidayPackages?.map((pkg) => (
            <tr key={pkg.id}>
              {Headings.map((field) => (
                <td data-label={field} key={field}>
                  {editMode === pkg.id ? (
                    <input
                      type={field === "duration_nights" ? "number" : "text"}
                      name={field}
                      value={editedValues[field] || ""}
                      onChange={handleChange}
                    />
                  ) : (
                    pkg[field]
                  )}
                </td>
              ))}
              <td data-label="Manage">
                {editMode === pkg.id ? (
                  <button onClick={updateHandler}>Update</button>
                ) : (
                  <button onClick={() => editHandler(pkg.id, pkg)}>Edit</button>
                )}
                <button onClick={() => handleDelete(pkg.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HolidayPackageTable;
