// TODO cliking on a date replaces calendar's header with input field to save task, bottom: display task
// or current row gets replaced with text input
// TODO clicking on month name gives month choice view
class Calendar {
    /* 1 extra row so that when 1st day of month is sunday, last days get displayed too */
    // TODO automate it - 6 rows only if needed!
    static rows = 6;
    static cols = 7;

    constructor() {
        Calendar.fillCalendar(new Date())
    }

    static fillCalendar(currentDate) {
        let firstDay = Calendar.firstDay(currentDate.getFullYear(), currentDate.getMonth());
        let daysInMonth = Calendar.daysInMonth(currentDate.getFullYear(), currentDate.getMonth());
        let markup = "";
        let counter = 1;

        for (let i = 0; i < this.rows; i++) {
            markup += `<tr id ='"${i}"'>`;

            for (let j = 0; j < this.cols; j++) {
                if (counter <= daysInMonth) {
                    if (j < firstDay && i === 0) {
                        markup += "<td></td>";
                        continue;
                    }
                    markup += `<td class ='"${counter}"'>` + counter++ + "</td>"
                }
            }
        }
        CALENDAR_BODY.innerHTML = markup;
    }

    static daysInMonth(iYear, iMonth) {
        return (32 - new Date(iYear, iMonth, 32).getDate());
    }

    static firstDay(year, month) {
        let temp = new Date(year, month).getDay();

        if (temp === 0) {
            return 6;
        }
        return temp - 1;
    }
}


// CALENDAR_HEADER.style.display = "none";
const CALENDAR_CONTAINER = document.getElementById("calendar");
const CALENDAR_BODY = document.getElementById("calendar-body");
const CALENDAR_HEADER = document.getElementById("calendar-header");
const CALENDAR_BUTTON_LEFT = document.getElementById("calendar-header-button-left");
const CALENDAR_BUTTON_RIGHT = document.getElementById("calendar-header-button-right");
const MONTH_ID = document.getElementById("calendar-header-month");
const YEAR_ID = document.getElementById("calendar-header-year");
const DATE = new Date();

monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień",
    "Maj", "Czerwiec", "Lipiec", "Sierpień",
    "Wrzesień", "Październik", "Listopad", "Grudzień"];

function handleLeft() {
    DATE.setMonth(DATE.getMonth() - 1);
    MONTH_ID.innerText = monthNames[DATE.getMonth()];
    YEAR_ID.innerText = DATE.getFullYear().toString();
    Calendar.fillCalendar(DATE);
}

function handleRight() {
    DATE.setMonth(DATE.getMonth() + 1);
    MONTH_ID.innerText = monthNames[DATE.getMonth()];
    YEAR_ID.innerText = DATE.getFullYear().toString();
    Calendar.fillCalendar(DATE);
}



/* RUNNING CODE */
cal = new Calendar();

/* EVENT LISTENERS */
CALENDAR_BUTTON_LEFT.addEventListener('click', handleLeft);
CALENDAR_BUTTON_RIGHT.addEventListener('click', handleRight);