import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const usePackageApi = () => {
  const [holidayPackages, setHolidayPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // --------->GET
  const fetchHolidayPackages = async () => {
    try {
      const response = await fetch("http://localhost:4000/admin");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setHolidayPackages(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidayPackages();
  }, []);


  // --------->POST
  const addHolidayPackage = async (newPackage) => {
    try {
      const response = await fetch("http://localhost:4000/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPackage),
      });
      if (!response.ok) {
        throw new Error("Failed to add holiday package");
      }

      await fetchHolidayPackages();
      toast.success("Added Successfully!");
    } catch (error) {
      setError(error);
      toast.error(error.message);
    }
  };


  // ------>PUT

  const editHolidayPackage = async (id, updatedPackage) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPackage),
      });
      if (!response.ok) {
        throw new Error("Failed to edit holiday package");
      }
      const data = await response.json();
      const updatedPackages = holidayPackages.map((pkg) =>
        pkg.id === id ? data : pkg
      );
      setHolidayPackages(updatedPackages);
      await fetchHolidayPackages();
      toast.success("Updated!");
    } catch (error) {
      setError(error);
      toast.error(error.message);
    }
  };

  // --------->DELETE
  const deleteHolidayPackage = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete holiday package");
      }
      const updatedPackages = holidayPackages.filter((pkg) => pkg.id !== id);
      setHolidayPackages(updatedPackages);
      toast.success("Deleted!");
    } catch (error) {
      setError(error);
      toast.error(error.message);
    }
  };

  return {
    holidayPackages,
    addHolidayPackage,
    editHolidayPackage,
    deleteHolidayPackage,
    loading,
    error,
  };
};

export default usePackageApi;
