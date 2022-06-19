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






//add click event to the spotlight images and weather and event maybe make even the join section a big version of a button


//fixing images //it didn't work
// function rightSizePlz(newPic, locat) {
//     locat.setAttribute("style", 'background-image: url("'+ newPic +'")') 

// }
// let newPic = document.querySelector("#hero-pic")

// let locat = document.querySelector("#event")
// console.log(newPic, locat)
// rightSizePlz(newPic, locat)



//Discover Page


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
if (document.URL.includes("discover/")) {
document.querySelector("#visit-interval-calculated").innerHTML =  (Math.round(daysSinceLastVisit["days"] * 1) / 1);
}
localStorage.last_visit = (new Date()).getTime();


//Doing the directory

requestURL = "json/data.json";
const cards = document.querySelector("#directory-cards");
fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject); //temporary to check it worked in valid format
        const businesses = jsonObject['business'];
        businesses.forEach(displayBusiness);
});
function displayBusiness(business) {
    //creating elements to insert
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let ul = document.createElement('ul');
    let businessLogo = document.createElement('img');

    //Function to add info to card's ul
    function liAdder(title, info) {
        let li = document.createElement('li');
        li.innerHTML = `<strong>${title}</strong>${info}`;
        return li;
    };

    h2.textContent = business.name;

    //adding info about business in li format to the ul //copy and paste to add more
    ul.appendChild(liAdder("Address: ", business.address));
    ul.appendChild(liAdder("Phone Number: ", business.phone));
    ul.appendChild(liAdder("Website URL: ", business.website_URL));
    ul.appendChild(liAdder("Membership Level: ", business.membership_level));
    ul.appendChild(liAdder("Other Info: ", business.other_info));
    

    //using setAttribute to make the image show up with alt text and a lazy load fashion
    businessLogo.setAttribute('src', business.image);
    businessLogo.setAttribute('alt', `alt info`);
    businessLogo.setAttribute('loading', 'lazy');

    //adding the h2 and portrait(img) elements to the card
    card.appendChild(businessLogo);
    card.appendChild(h2);
    card.appendChild(ul);
    

    //Adding the card to the html with all of its children
    document.querySelector('#directory-cards').appendChild(card);
};