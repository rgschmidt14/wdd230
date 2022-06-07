//Toggle for Hamburger Menu
function toggleMenu() {
    document.getElementById("nav1").classList.toggle("clicked")
    document.getElementById("hamburgerBtn").classList.toggle("clicked")
}

const tHam = document.getElementById('hamburgerBtn');
tHam.onclick = toggleMenu;


//Date and Time Calculations
monthsNames = [
    "January",
    "Febraury",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
    
daysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

function dTReader(date) { //give it a new Date() if you do not have a specific date in mind to give it. ...this formula is off when it comes to the first and last couple days of the month, since I simply have it dividing 365 days into 12 equal months instead of looping through an array of how many days are in each month and aggregating them together to figure out which month we are in.
    const aMinute = 1000 * 60;
    const anHour = aMinute * 60;
    const aDay = anHour * 24;
    const aYear = aDay * 365;
    const d = date;
    let years = Math.floor(d.getTime() / aYear) + 1970;
    let months = monthsNames[Math.floor(((d.getTime() / aYear) - years + 1970) * 12)];
    let dayOfWeek = daysNames[Math.floor(d.getDay())];
    let day = d.getDate();
    let minutes = `${d.getMinutes()<10?'0':''}${d.getMinutes()}`;
    let timeOfDay = `${d.getHours()}:${minutes}`;
    let dateCreated = [d,timeOfDay,dayOfWeek,months,day,years]; //These are the outcomes: [0] is the date object, [1] the time, [2] the english word for the day of the week, [3] the english name for the month of the year, [4] the day of the month in number format, [5] the year.
    return dateCreated;  
}

var readerOutcome1 = dTReader(new Date());
document.getElementById("giveMeTodaysDate").innerHTML = ` ${readerOutcome1[2]}, ${readerOutcome1[4]} ${readerOutcome1[3]} ${readerOutcome1[5]}`;
document.getElementById("yearFooter").innerHTML = ` ${readerOutcome1[5]}`;
var readerOutcome2 = document.lastModified
document.getElementById("recentUpDate").innerHTML = `Last Modified: ${readerOutcome2}`;

//loading images
function imageReplacer(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = () => {img.removeAttribute("data-src")};
};
let loadThese = document.querySelectorAll("img[data-src]");

if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (items, observer) => {
            items.forEach((item) => {
                if(item.isIntersecting) {
                    imageReplacer(item.target);
                    observer.unobserve(item.target);
                }
            });
        });
        loadThese.forEach((img) => {
            observer.observe(img);
        });
} else {
    loadThese.forEach((img) => {
        imageReplacer(img);
    });
};

//calculating days since last visit:
if (!(localStorage.last_visit)) {
    localStorage.last_visit = (new Date()).getTime();
    console.log(localStorage.last_visit, "it worked")
}


function dateSubtractor(newDate, oldDate) {
    console.log(newDate, oldDate)
    let miliseconds = (newDate - oldDate);
    let seconds = (miliseconds / 1000);
    let minutes = (seconds / 60);
    let hours = (minutes / 60);
    let days = (hours / 24);
    let returnObject = {
        "days":days,
        "hours":hours,
        "minutes":minutes,
        "seconds":seconds,
        "default":miliseconds
    }
    console.log(returnObject)
    return returnObject
}

let daysSinceLastVisit = dateSubtractor(readerOutcome1[0].getTime(), Number(localStorage.last_visit));
document.querySelector("#visit-interval-calculated").innerHTML =  (Math.round(daysSinceLastVisit["days"] * 100) / 100);