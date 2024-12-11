fetch("holidays-2025.json")
    .then((response) => response.json())
    .then((holidays) => {
        const urlParams = new URLSearchParams(window.location.search);
        const holidayIndex = parseInt(urlParams.get("holiday"), 10);

        const holiday = holidays.find((h) => h.index === holidayIndex);

        if (holiday) {
            const holidayDetails = document.getElementById("holidayDetails");
            holidayDetails.innerHTML = `
        
        <div class="holidayHeader">
        <span class="holidayType">${holiday.holidayType}</span>
        <h1 class="holidayTitle">${holiday.title}</h1>
        <span class="holidayDate">${holiday.month} ${holiday.day}, ${holiday.year}</span>
        </div>
        <img src="${holiday.image}" alt="${holiday.title}" class="holidayImage">
        <p class="holidayDescription">${holiday.description}</p>
    `;
        } else {
            document.getElementById("holidayDetails").innerHTML = `
        <h1>Holiday Not Found!</h1>
        <p>Sorry, we couldn't find the details for this holiday.</p>
    `;
        }
    })
    .catch((error) => {
        console.error("Error loading holidays:", error);
        document.getElementById("holidayDetails").innerHTML = `
    <h1>Error!</h1>
    <p>There was an error loading the holiday details.</p>
`;
    });

feather.replace();
