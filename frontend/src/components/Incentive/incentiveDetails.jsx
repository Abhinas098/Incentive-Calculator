import React, { useCallback, useEffect, useState } from "react";
import styles from "./IncentiveCalculator.module.css";
import useApi from "./utill/hooks/useApi";
import Modal from "../Ui/Modal";
import HolidayPackageDetails from "./packageDetails";

const IncentiveDetails = ({ getSales = [], incentive, bonus, eligibility }) => {
  const [packages, setPackages] = useState([]);
  const [eligiblePackage, setEligiblePackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const { fetchData } = useApi();

  const fetchPackages = useCallback(async () => {
    try {
      const data = await fetchData("http://localhost:4000/admin", "GET");
      setPackages(data || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setError(error);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // ------------------------------------> Gave package to user on basis of Sales
  useEffect(() => {
    if (packages.length > 0 && getSales?.length > 0 && getSales[0]?.totalSales) {
      const sortedPackages = [...packages].sort(
        (a, b) => a.duration_nights - b.duration_nights
      );

      const Sales = [100000, 80000, 60000, 50000];
      let selectedPackage = sortedPackages[0];

      for (let i = 0; i < Sales.length; i++) {
        if (getSales[0]?.totalSales >= Sales[i]) {
          selectedPackage = sortedPackages[sortedPackages.length - (i + 1)];
          break;
        }
      }

      setEligiblePackage(selectedPackage);
    }
  }, [packages, getSales]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //-----------------> A dummy package if package not available in db
  const dummyPackage = {
    holiday_name: "A Goa Trip",
    duration_nights: 1,
    destination: "Goa",
    location: "Goa",
    amenities: "Available free flight ticket",
  };

  const renderIncentiveDetails = () => {
    if (!getSales || getSales.length === 0 || getSales[0]?.totalSales === 0) {
      return <p>No Sales Here. Add Your Total Sales!</p>;
    }

    return (
      <>
        <h2 className={styles.resultTitle}>Incentive Details:</h2>
        {error && <p>Error fetching holiday packages: {error.message}</p>}
        <>
          <p>Your Total Sales: {getSales[0]?.totalSales}</p>
          <p>Incentive Percent: {incentive}%</p>
          {getSales[0]?.totalSales >= 50000 ? (
            <> </>
          ) : (
            <p>
              Bonus: {bonus ? `You got $${bonus}` : "Sale 30K to get Bonus"}
            </p>
          )}
          {eligibility && (
            <>
              <p>
                Eligible for Holiday Package{" "}
                <button className={styles.modelButton} onClick={openModal}>
                  View Package
                </button>
              </p>
              {isModalOpen && (
                <Modal closeModal={closeModal}>
                  <HolidayPackageDetails
                    eligible={eligiblePackage || dummyPackage}
                    closeModal={closeModal}
                  />
                </Modal>
              )}
            </>
          )}
        </>
      </>
    );
  };

  return <div className={styles.resultSection}>{renderIncentiveDetails()}</div>;
};

export default IncentiveDetails;
