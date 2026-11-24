function dateCheck() {
    const userDate = document.getElementById("idate").value;

    const [year, month, day] = userDate.split("-").map(Number);

    return new Date(year, month - 1, day);
}

function numberCheck() {
    const userNumber = document.getElementById("inumber").value;

    return parseInt(userNumber, 10);
}

function formatDate(date) {
    return date.toLocaleDateString(currentLanguage, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function formatWeekday(date) {
    return date.toLocaleDateString(currentLanguage, {
        weekday: "long"
    });
}

function calcDate(event) {
    if (event) {
        event.preventDefault();
    }

    const form = document.getElementById("calculator");

    if (!form.reportValidity()) {
        return;
    }

    const startDate = dateCheck();
    const days = numberCheck();

    // Calculate the final day of leave
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days - 1);

    // Calculate the return-to-work date
    const returnDate = new Date(endDate);
    returnDate.setDate(returnDate.getDate() + 1);

    // Skip weekends
    while (returnDate.getDay() === 0 ||
           returnDate.getDay() === 6) {
        returnDate.setDate(returnDate.getDate() + 1);
    }

    // Display localized results
    document.getElementById("result").innerHTML =
        translations[currentLanguage].result(
            days,
            formatDate(startDate),
            formatWeekday(startDate),
            formatDate(endDate),
            formatWeekday(endDate),
            formatDate(returnDate),
            formatWeekday(returnDate)
        );

    // Scroll to the bottom of the page
    if (event) {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth"
        });
    }
}