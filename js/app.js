// Constants
const HOURS_PER_WEEK = 37.5;
const DAYS_PER_WEEK = 5;
const WEEKS_PER_MONTH = 4.33;

// DOM Elements
const salaryInput = document.getElementById("salary");
const priceInput = document.getElementById("price");
const naturalTimeOutput = document.getElementById("natural-time");
const workDaysOutput = document.getElementById("work-days");
const monthsOutput = document.getElementById("months");
const hourlyPercentOutput = document.getElementById("hourly-percent");
const dailyPercentOutput = document.getElementById("daily-percent");
const weeklyPercentOutput = document.getElementById("weekly-percent");
const monthlyPercentOutput = document.getElementById("monthly-percent");

// Event Listeners
salaryInput.addEventListener("input", updateCalculations);
priceInput.addEventListener("input", updateCalculations);

// Main Function
function updateCalculations() {
  const monthlySalary = parseFloat(salaryInput.value);
  const itemPrice = parseFloat(priceInput.value);

  if (isNaN(monthlySalary) || isNaN(itemPrice) || monthlySalary < 0 || itemPrice < 0) {
    clearOutputs();
    return;
  }

  // Calculations
  const hourlyWage = monthlySalary / (HOURS_PER_WEEK * WEEKS_PER_MONTH);
  const dailyWage = hourlyWage * (HOURS_PER_WEEK / DAYS_PER_WEEK);
  const weeklyWage = hourlyWage * HOURS_PER_WEEK;

  // Time to Afford
  const totalHours = itemPrice / hourlyWage;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);
  const workDays = itemPrice / dailyWage;
  const months = itemPrice / monthlySalary;

  // Percentage of Wages
  const hourlyPercent = (itemPrice / hourlyWage) * 100;
  const dailyPercent = (itemPrice / dailyWage) * 100;
  const weeklyPercent = (itemPrice / weeklyWage) * 100;
  const monthlyPercent = (itemPrice / monthlySalary) * 100;

  // Display Results
  displayNaturalTime(hours, minutes);
  displayWorkDays(workDays);
  displayMonths(months);
  displayPercentages(hourlyPercent, dailyPercent, weeklyPercent, monthlyPercent);
}

// Helper Functions
function displayNaturalTime(hours, minutes) {
  if (hours === 0 && minutes === 0) {
    naturalTimeOutput.textContent = "";
  } else if (hours === 0) {
    naturalTimeOutput.textContent = `${minutes} ${pluralize(minutes, "minute")}`;
  } else if (minutes === 0) {
    naturalTimeOutput.textContent = `${hours} ${pluralize(hours, "hour")}`;
  } else {
    naturalTimeOutput.textContent = `${hours} ${pluralize(hours, "hour")} and ${minutes} ${pluralize(minutes, "minute")}`;
  }
}

function displayWorkDays(workDays) {
  if (workDays >= 1) {
    workDaysOutput.textContent = `${round(workDays)} ${pluralize(workDays, "day")}`;
  } else {
    workDaysOutput.textContent = "";
  }
}

function displayMonths(months) {
  if (months >= 1) {
    monthsOutput.textContent = `${round(months)} ${pluralize(months, "month")}`;
  } else {
    monthsOutput.textContent = "";
  }
}

function displayPercentages(hourlyPercent, dailyPercent, weeklyPercent, monthlyPercent) {
  hourlyPercentOutput.textContent = `${round(hourlyPercent)}% of your hourly wage`;
  dailyPercentOutput.textContent = `${round(dailyPercent)}% of your daily wage`;
  weeklyPercentOutput.textContent = `${round(weeklyPercent)}% of your weekly wage`;
  monthlyPercentOutput.textContent = `${round(monthlyPercent)}% of your monthly wage`;
}

function pluralize(value, unit) {
  return value === 1 ? unit : `${unit}s`;
}

function round(value) {
  if (value % 1 === 0) {
    return value.toFixed(0);
  } else if (value * 10 % 1 === 0) {
    return value.toFixed(1);
  } else {
    return value.toFixed(2);
  }
}

function clearOutputs() {
  naturalTimeOutput.textContent = "";
  workDaysOutput.textContent = "";
  monthsOutput.textContent = "";
  hourlyPercentOutput.textContent = "";
  dailyPercentOutput.textContent = "";
  weeklyPercentOutput.textContent = "";
  monthlyPercentOutput.textContent = "";
}

// Initialize
updateCalculations();