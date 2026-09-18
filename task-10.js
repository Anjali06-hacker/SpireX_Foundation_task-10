const countryInput = document.getElementById("countryInput");
const searchButton = document.getElementById("searchButton");
const statusMessage = document.getElementById("statusMessage");
const countryFlag = document.getElementById("countryFlag");
const countryName = document.getElementById("countryName");
const capital = document.getElementById("capital");
const population = document.getElementById("population");
const region = document.getElementById("region");
const currency = document.getElementById("currency");
const language = document.getElementById("language");
async function searchCountry() {
    const country = countryInput.value.trim();
    if (country === "") {
        statusMessage.textContent = "Please enter a country name.";
        return;
    }
    statusMessage.textContent = "Loading country information...";
    try {
        const response = await fetch(
            `https://countries.dev/name/${encodeURIComponent(country)}`
        );
        if (!response.ok) {
            throw new Error("Country not found");
        }
        const data = await response.json();
        // API returns an array, so take the first country
        const countryData = data.find(
                                country =>
        country.name.toLowerCase() === countryInput.value.trim().toLowerCase()
        ) || data[0] ;
        // Display country flag
        countryFlag.src = countryData.flags.svg;
        countryFlag.alt = countryData.name + " Flag";
        // Display country name
        countryName.textContent = countryData.name;
        // Display capital
        capital.textContent =
            countryData.capital || "Not available";
        // Display population
        population.textContent =
            countryData.population.toLocaleString();
        // Display region
        region.textContent =
            countryData.region || "Not available";
        // Display currency
        if (
            countryData.currencies &&
            countryData.currencies.length > 0
        ) {
            currency.textContent =
                `${countryData.currencies[0].name} (${countryData.currencies[0].code})`;
        } else {
            currency.textContent = "Not available";
        }
        // Display language
        if (
            countryData.languages &&
            countryData.languages.length > 0
        ) {
            language.textContent =
                countryData.languages
                    .map(item => item.name)
                    .join(", ");
        } else {
            language.textContent = "Not available";
        }
        // Clear status message
        statusMessage.textContent = "";
    } catch (error) {
        statusMessage.textContent =
            "Country not found. Please check the name and try again.";
        countryFlag.src = "";
        countryName.textContent = "No country found";
        capital.textContent = "-";
        population.textContent = "-";
        region.textContent = "-";
        currency.textContent = "-";
        language.textContent = "-";
    }
}
// Search button
searchButton.addEventListener("click", searchCountry);
// Press Enter to search
countryInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchCountry();
    }
});