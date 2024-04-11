const calculateIncentive = (totalSales) => {
  let incentive = 0;
  let bonus = 0;
  let eligibility = false;

  if (totalSales >= 50000) {
    incentive = 5;
    eligibility = true;
  } else if (totalSales >= 30000) {
    incentive = 3.5;
    bonus = 1000;
  } else if (totalSales >= 20000) {
    incentive = 3;
  } else if (totalSales >= 10000) {
    incentive = 1.5;
  }

  return { incentive, bonus, eligibility };
};

export default calculateIncentive;
