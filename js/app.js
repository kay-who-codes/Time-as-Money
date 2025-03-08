const wageInput = document.getElementById('wage');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const resultsContainer = document.getElementById('results');
const totalEarnings = document.getElementById('totalEarnings');

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
}

function calculateEarnings() {
    const wage = parseFloat(wageInput.value);
    const hours = parseFloat(hoursInput.value) || 0; // Default to 0 if empty
    const minutes = parseFloat(minutesInput.value) || 0; // Default to 0 if empty

    if (isNaN(wage) || wage <= 0 || (hours === 0 && minutes === 0)) {
        resultsContainer.style.display = 'none';
        return;
    }

    // Convert minutes to hours (e.g., 90 minutes = 1.5 hours)
    const totalHours = hours + (minutes / 60);

    // Calculate total earnings
    const earnings = wage * totalHours;
    totalEarnings.textContent = formatCurrency(earnings);
    resultsContainer.style.display = 'block';
}

wageInput.addEventListener('input', calculateEarnings);
hoursInput.addEventListener('input', calculateEarnings);
minutesInput.addEventListener('input', calculateEarnings);
