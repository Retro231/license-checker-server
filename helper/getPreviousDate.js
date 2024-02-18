exports.getPreviousDate = (inputDate) => {
  // Split the input date string into day, month, and year
  const [day, month, year] = inputDate.split("-").map(Number);

  // Create a Date object with the input values (subtract 1 from month as it is 0-indexed in Date)
  const currentDate = new Date(year, month - 1, day);

  // Get the time in milliseconds for the previous day (86400000 milliseconds in a day)
  const previousDay = currentDate.getTime() - 86400000;

  // Create a new Date object for the previous day
  const previousDate = new Date(previousDay);

  // Extract the day, month, and year components
  const previousDayFormatted = previousDate
    .getDate()
    .toString()
    .padStart(2, "0");
  const previousMonthFormatted = (previousDate.getMonth() + 1)
    .toString()
    .padStart(2, "0"); // Add 1 as month is 0-indexed
  const previousYearFormatted = previousDate.getFullYear();

  // Format the components as dd-mm-yyyy
  const formattedPreviousDate = `${previousDayFormatted}-${previousMonthFormatted}-${previousYearFormatted}`;

  return formattedPreviousDate;
};
