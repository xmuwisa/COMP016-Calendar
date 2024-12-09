fetch("holidays-2025.json")
    .then((response) => response.json())
    .then((holidays) => {
        const urlParams = new URLSearchParams(window.location.search);
        const holidayIndex = parseInt(urlParams.get("holiday"), 10); // Ensure it's a number

        const holiday = holidays.find((h) => h.index === holidayIndex);

        if (holiday) {
            const holidayDetails = document.getElementById("holidayDetails");
            holidayDetails.innerHTML = `
        <h1 class="holiday-title">${holiday.title}</h1>
        <p class="holiday-date">${holiday.month} ${holiday.day}, ${holiday.year}</p>
        <img src="${holiday.image}" alt="${holiday.title}" class="holiday-image">
        <p class="holiday-description">${holiday.description}</p>
    `;
        } else {
            document.getElementById("holidayDetails").innerHTML = `
        <h1>Holiday Not Found</h1>
        <p>Sorry, we couldn't find the details for this holiday.</p>
    `;
        }
    })
    .catch((error) => {
        console.error("Error loading holidays:", error);
        document.getElementById("holidayDetails").innerHTML = `
    <h1>Error</h1>
    <p>There was an error loading the holiday details.</p>
`;
    });
