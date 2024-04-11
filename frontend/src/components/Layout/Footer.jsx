import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const columns = [
    {
      title: "Company",
      items: ["About Us", "Services", "Contact Us", "Careers"]
    },
    {
      title: "Quick Links",
      items: ["FAQs", "Terms & Conditions", "Privacy Policy", "Site Map"]
    },
    {
      title: "Support",
      items: ["Customer Service", "Help Center", "Report Fraud", "Accessibility"]
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {columns.map((column, index) => (
            <div key={index} className={styles.footerColumn}>
              <h4>{column.title}</h4>
              <ul>
                {column.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
