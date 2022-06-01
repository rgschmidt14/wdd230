
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

function dTReader(date) { //give it a new Date() if you do not have a specific date in mind to give it.
    const aMinute = 1000 * 60;
    const anHour = aMinute * 60;
    const aDay = anHour * 24;
    const aYear = aDay * 365;
    const d = date;
    let years = Math.floor(d.getTime() / aYear) + 1970;
    let months = monthsNames[Math.floor(((d.getTime() / aYear) - years + 1970) * 12) - 1]; //the minus one is because javascript starts at 0 not 1 in their arrays.
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

//Mon/Tue Announcement ......This is not working....
let banner = document.querySelector("#banner")
if (!(readerOutcome1[2] === daysNames[1] || readerOutcome1[2] === daysNames[2])) {
    banner.style.display = "none";
};




//add click event to the spotlight images and weather and event maybe make even the join section a big version of a button


//fixing images //it didn't work
// function rightSizePlz(newPic, locat) {
//     locat.setAttribute("style", 'background-image: url("'+ newPic +'")') 

// }
// let newPic = document.querySelector("#hero-pic")

// let locat = document.querySelector("#event")
// console.log(newPic, locat)
// rightSizePlz(newPic, locat)