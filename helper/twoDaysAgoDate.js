exports.getTwoDaysAgoDate = (inputDate) => {
  // Split the input date string into day, month, and year
  const [day, month, year] = inputDate.split("-").map(Number);

  // Create a Date object with the input values (subtract 1 from month as it is 0-indexed in Date)
  const currentDate = new Date(year, month - 1, day);

  // Get the time in milliseconds for two days ago (2 * 86400000 milliseconds in a day)
  const twoDaysAgo = currentDate.getTime() - 2 * 86400000;

  // Create a new Date object for two days ago
  const twoDaysAgoDate = new Date(twoDaysAgo);

  // Extract the day, month, and year components
  const twoDaysAgoDayFormatted = twoDaysAgoDate
    .getDate()
    .toString()
    .padStart(2, "0");
  const twoDaysAgoMonthFormatted = (twoDaysAgoDate.getMonth() + 1)
    .toString()
    .padStart(2, "0"); // Add 1 as month is 0-indexed
  const twoDaysAgoYearFormatted = twoDaysAgoDate.getFullYear();

  // Format the components as dd-mm-yyyy
  const formattedTwoDaysAgoDate = `${twoDaysAgoDayFormatted}-${twoDaysAgoMonthFormatted}-${twoDaysAgoYearFormatted}`;

  return formattedTwoDaysAgoDate;
};
