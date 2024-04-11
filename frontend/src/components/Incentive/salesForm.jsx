import React from "react";
import styles from "./IncentiveCalculator.module.css";

const SalesForm = ({ sales, setSales, getSales, onSubmit, check }) => {
  return (
    <div className={styles.left}>
      <form onSubmit={onSubmit}>
        <label className={styles.label}>Enter Your Total Sales:</label>
        <input
          type="number"
          className={styles.input}
          value={isNaN(sales) ? "" : String(sales)}
          onChange={(e) => setSales(parseInt(e.target.value))}
          required
        />
        <button
          disabled={isNaN(sales) || sales === undefined || null}
          type="submit"
          className={styles.button}
        >
          {check ? "Update Sales" : "Add Sales"}
        </button>
      </form>
      <p>{check && "Total Sales:" + getSales[0].totalSales}</p>
    </div>
  );
};

export default SalesForm;
