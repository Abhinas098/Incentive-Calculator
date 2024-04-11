import { useEffect } from "react";
import useApi from "./hooks/useApi";

const EmailSender = ({ email, incentive, bonus }) => {
  const { fetchData } = useApi();

  useEffect(() => {
    const sendHolidayPackageEmail = async () => {
      try {
        const lastSentDate = localStorage.getItem("lastSentDate");
        const currentDate = new Date().toISOString().split("T")[0];
        if (lastSentDate === currentDate)
          return console.log("Email already sent for today");

        await fetchData("http://localhost:4000/send-email", "POST", {
          userEmail: email,
          incentiveDetails: `Incentive: ${incentive}%, Bonus: ${bonus || "0"}`,
          holidayPackage: "Congrats U are selected for Holiday Package.",
        });

        localStorage.setItem("lastSentDate", currentDate);
        
      } catch (error) {
        console.error("Error :", error);
      }
    };

    sendHolidayPackageEmail();
  }, [email, incentive, bonus, fetchData]);

  return null;
};

export default EmailSender;
