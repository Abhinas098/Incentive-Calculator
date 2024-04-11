import React from "react";

const HolidayPackageDetails = ({ eligible }) => (
  <>
    <h2>Your Holiday Package</h2>
    <p>Package Name: {eligible.holiday_name}</p>
    <p>Duration (Nights): {eligible.duration_nights}</p>
    <p>Destination: {eligible.destination}</p>
    <p>Location: {eligible.location}</p>
    <p>Amenities: {eligible.amenities}</p>
  </>
);

export default HolidayPackageDetails;
