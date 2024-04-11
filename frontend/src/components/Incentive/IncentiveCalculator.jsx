import React, { useContext, useEffect, useState, useCallback } from "react";
import styles from "./IncentiveCalculator.module.css";
import { toast } from "react-hot-toast";

import calculateIncentive from "./utill/calculateIncentive";
import SalesForm from "./salesForm";
import IncentiveDetails from "./incentiveDetails";
import EmailSender from "./utill/EmailSender";

import AuthCtx from "../../context/AuthCtx";
import useApi from "./utill/hooks/useApi";

const IncentiveCalculator = () => {
  const [sales, setSales] = useState(0);
  const [getSales, setGetSales] = useState(null);
  const [incentive, setIncentive] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [eligibility, setEligibility] = useState(false);
  const [loading, setLoading] = useState(false);

  // Custom hook
  const { fetchData } = useApi();
  const ctx = useContext(AuthCtx);

  const email = ctx.token?.email;

  //------------------------------------------------------> sending  mail to make it user specific
  const body = { totalSales: sales, userId: email };

  //------------------------------------------------------> get TotalSale for login user
  const fetchSales = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchData(
        `http://localhost:4000/sales/${body.userId}`,
        "GET"
      );
      setGetSales(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sales:", error);
      setLoading(false);
    }
  }, [fetchData, body.userId]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  //------------------------------------------------------> Calculating the Incentive
  useEffect(() => {
    if (getSales && getSales.length > 0) {
      const { incentive, bonus, eligibility } = calculateIncentive(
        getSales[0].totalSales
      );
      setIncentive(incentive);
      setBonus(bonus);
      setEligibility(eligibility);
    }
  }, [getSales]);

  //-----------------------------------> Checking the the db if the data already present then update else add it.
  const salesHandler = async (e) => {
    e.preventDefault();

    try {
      await fetchData(
        check
          ? `http://localhost:4000/sales/${body.userId}`
          : "http://localhost:4000/sales",
        check ? "PUT" : "POST",
        body
      );
      fetchSales();
      setSales("");
      toast.success("Updated");
    } catch (error) {
      console.error("Error calculating incentive:", error);
      toast.error(error.message);
    }
  };

  //------------------------------------------------------> checking the sales length
  const check = getSales && getSales.length > 0;

  return (
    <div className={styles.salesContainer}>
      <h1 className={styles.heading}>Incentive Calculator</h1>
      <div className={styles.card}>
        <div className={styles.inputSection}>
          <SalesForm
            sales={sales}
            setSales={setSales}
            onSubmit={salesHandler}
            getSales={getSales}
            check={check}
          />
        </div>
        {loading ? (
          <>Loading....</>
        ) : (
          <IncentiveDetails
            getSales={getSales}
            check={check}
            incentive={incentive}
            bonus={bonus}
            eligibility={eligibility}
          />
        )}

        {eligibility && (
          <EmailSender email={email} incentive={incentive} bonus={bonus} />
        )}
      </div>
    </div>
  );
};

export default IncentiveCalculator;
