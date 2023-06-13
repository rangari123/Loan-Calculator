// submit eventlistener on whole form -- button bro.
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // hide results
  document.getElementById("results").style.display = "none";

  // show loader
  document.getElementById("loading").style.display = "block";

  // show loader for 2 sec and run calculateResults functions
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// calculate Results

function calculateResults() {
  console.log("calculating...");

  // UI variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  // showing caluclation ui variables

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalIntrest = document.getElementById("total-intrest");

  // formula to caluclate loan

  const principal = parseFloat(amount.value); // (P)
  const calculateInrest = parseFloat(interest.value) / 100 / 12; // (r) interest
  const calculatedPayments = parseFloat(years.value) * 12; // (n) years convert to months

  // calculate monthly payments [MonthlyPayments = P * (r * (1 + r)^n) / ((1 + r)^n - 1)]

  const x = Math.pow(1 + calculateInrest, calculatedPayments); // (1 + r)^n
  const monthly = (principal * x * calculateInrest) / (x - 1);

  // isFinite means enter  correct values only numeric value

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2); //Total Payments = Monthly Payment * Number of Months
    totalIntrest.value = (monthly * calculatedPayments - principal).toFixed(2); //Total Interest = (Monthly Payment * Number of Months) - Loan Amount(P)

    // show results
    document.getElementById("results").style.display = "block";
    // hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please Check Your Numbers!");
  }
}

// error function
function showError(error) {
  // hide results
  document.getElementById("results").style.display = "none";
  // hide loader
  document.getElementById("loading").style.display = "none";
  // create a div
  const errorDiv = document.createElement("div");
  // where to put div
  const card = document.querySelector(".card"); // parent element
  const heading = document.querySelector(".heading");

  // add class Name to errordiv
  errorDiv.className = "alert alert-danger";

  // add text inside div
  errorDiv.appendChild(document.createTextNode(error));

  // insert before heading

  card.insertBefore(errorDiv, heading);

  // clear error div

  setTimeout(clearError, 2000); // show error after 2sec
}
function clearError() {
  document.querySelector(".alert").remove();
}
