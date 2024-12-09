let currentMonth = 0;
const year = 2025;
let isGridView = true;

let holidays = [];

fetch("holidays-2025.json")
    .then((response) => response.json())
    .then((data) => {
        holidays = data;
        renderCalendar();
    })
    .catch((error) => console.error("Error loading holidays:", error));

function renderCalendar() {
    if (isGridView) {
        renderMonthGrid();
    } else {
        renderSingleMonth();
    }
}

// Render the single month calendar
function renderSingleMonth() {
    const firstDay = new Date(year, currentMonth, 1);
    const lastDay = new Date(year, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    const monthName = firstDay.toLocaleString("default", { month: "long" });
    document.getElementById("monthName").textContent = `${monthName} ${year}`;

    const calendarBody = document.querySelector("#calendarTable tbody");
    calendarBody.innerHTML = "";

    const firstDayOfWeek = firstDay.getDay();

    let row = document.createElement("tr");

    for (let i = 0; i < firstDayOfWeek; i++) {
        row.appendChild(document.createElement("td"));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement("td");
        cell.textContent = day;

        const holiday = holidays.find(
            (h) =>
                h.day == day &&
                h.month ===
                    firstDay.toLocaleString("default", { month: "long" })
        );
        if (holiday) {
            cell.classList.add("holiday");
            cell.addEventListener("click", () => {
                window.location.href = `holiday.html?holiday=${holiday.index}`;
            });
        }

        row.appendChild(cell);

        if ((firstDayOfWeek + day) % 7 === 0) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
    }

    if (row.children.length > 0) {
        calendarBody.appendChild(row);
    }

    document.getElementById("calendarTable").style.display = "table";
    document.getElementById("monthGrid").style.display = "none";
}

function renderMonthGrid() {
    const gridContainer = document.getElementById("monthGrid");
    gridContainer.innerHTML = "";

    for (let month = 0; month < 12; month++) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const firstDayOfWeek = firstDay.getDay();
        const monthName = firstDay.toLocaleString("default", { month: "long" });

        const miniCalendar = document.createElement("div");
        miniCalendar.classList.add("mini-calendar");
        miniCalendar.id = `mini-calendar-${month}`;

        const header = document.createElement("div");
        header.classList.add("mini-calendar-header");
        header.textContent = monthName;
        miniCalendar.appendChild(header);

        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        const headerRow = document.createElement("tr");
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
            const th = document.createElement("th");
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        let row = document.createElement("tr");

        for (let i = 0; i < firstDayOfWeek; i++) {
            row.appendChild(document.createElement("td"));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement("td");
            cell.textContent = day;

            const holiday = holidays.find(
                (h) => h.day == day && h.month === monthName
            );
            if (holiday) {
                cell.classList.add("holiday");
            }

            row.appendChild(cell);

            if ((firstDayOfWeek + day) % 7 === 0) {
                tbody.appendChild(row);
                row = document.createElement("tr");
            }
        }

        if (row.children.length > 0) {
            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        miniCalendar.appendChild(table);
        gridContainer.appendChild(miniCalendar);

        miniCalendar.addEventListener("click", () => {
            currentMonth = month;
            isGridView = false;
            renderCalendar();
        });
    }

    // Show the grid and hide the single month table
    document.getElementById("calendarTable").style.display = "none";
    document.getElementById("monthGrid").style.display = "grid";
}

function navigateMonth(direction) {
    if (!isGridView) {
        currentMonth += direction;

        if (currentMonth < 0) {
            currentMonth = 11;
        } else if (currentMonth > 11) {
            currentMonth = 0;
        }

        renderCalendar();
    }
}

function toggleView() {
    const toggleButton = document.getElementById("toggleButton");

    isGridView = !isGridView;

    if (isGridView) {
        toggleButton.textContent = "🌞";
    } else {
        toggleButton.textContent = "🌙";
    }

    renderCalendar();

    if (!isGridView) {
        currentMonth = 0;
        renderCalendar();
    }
}

renderCalendar();
