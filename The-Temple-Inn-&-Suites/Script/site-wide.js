/*Checking current window*/
let currentWindow = window.location.pathname;
console.log(currentWindow);




/*----------------Hamburger Menu----------------*/

function toggleAlt(query) {
    document.querySelector(query).classList.toggle("alt");
};


const hamMenuBtn = document.querySelector("#hamBtn");
hamMenuBtn.addEventListener("click", () => {toggleAlt("#hamBtn")})

const sitewideNavMenu = document.querySelector("header nav");
hamMenuBtn.addEventListener("click", () => {toggleAlt("header nav")})



/*---------------Slideshow for Landing (Home) Page---------------*/
//ditching this for now, sake of time

// function createSlideShow() {
//     var i = 0; //index number of array for slideshow's current slide
//     var timeBetween = 3000; //time in milliseconds between slide transitions
//     // var slideNameForProgram = `body main.home section`;
//     var currentSlide = document.getElementsByClassName('ss-home'); //The <main class="home"> is my array and the sections are the items within. Noting this to help know that an array of any kind can be used here, so long as it is index callable.
//     var slideShow = document.querySelector("main.home");

//     function runSlideShow() {
//         currentSlide[i].style.display = 'block';

//         if(i < slideShow.childElementCount - 1) {   //no minus 1 becuase the index starts at 1 not 0
//             i++;
//         } else {
//             i = 0;
//         };

//         setTimeout(runSlideShow(), timeBetween);
//     };
    
//     runSlideShow()

// };

// window.onload = createSlideShow()

//the problem was in it not changing slides. Showing a single slide worked, not changing though.


/*---------------Lazy Loading Images---------------*/
function replaceTheImage(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = () => {img.removeAttribute('data-src')};
};
let loadThese = document.querySelectorAll('img[data-src]');

if(IntersectionObserver in window) {
    const observer = new IntersectionObserver(
        (items, observer) => {
            items.forEach((item) => {
                if(item.isIntersecting) {
                    replaceTheImage(item.target);
                    observer.unobserve(item.target);
                }});
        });
} else {
    loadThese.forEach((img) => {
        replaceTheImage(img);
    });
};

/*Date Last Modified*/
let dateLastModified = document.lastModified
document.querySelector(".lastModified").innerHTML = dateLastModified;



/*Temples cards builder, one small the other large or 'full'*/
function smallCardBuilder(temple) {
    let newsection = document.createElement('section');
    let newh2 = document.createElement('h2');
    let newh3 = document.createElement('h3');
    let newimg = document.createElement('img');
    let newa1 = document.createElement('a');
    let newbutton = document.createElement('button');

    newh2.innerHTML = temple.name;
    newsection.appendChild(newh2);
    newh3.innerHTML = temple.history.One_Liner;
    newsection.appendChild(newh3);
    newimg.setAttribute('src', temple.photo);
    newimg.setAttribute('alt', `Image of the ${temple.name} Temple.`);
    newimg.setAttribute('loading', 'lazy');
    newsection.appendChild(newimg);
    newa1.setAttribute('href', temple.fullPageRef)
    newbutton.setAttribute('class', 'sitewide-button');
    newbutton.innerHTML = `Click here for more info.`;
    newa1.appendChild(newbutton)
    newsection.appendChild(newa1);



    document.querySelector('#temple-main').appendChild(newsection);
    
};

function fullCardBuilder(temple, ) {
    let newsection = document.createElement('section');
    let newh2 = document.createElement('h2');
    let newh3 = document.createElement('h3');
    let newimg = document.createElement('img');
    let newul1 = document.createElement('ul');
    let newul2 = document.createElement('ul');
    let newul3 = document.createElement('ul');
    let newp = document.createElement('p');
    let newa2 = document.createElement('a');
    let newul4 = document.createElement('ul');



    function liCompilerWithTitle(title, info) {
        let newli = document.createElement('li');
        newli.innerHTML = `<strong>${title}</strong>${info}`;
        return newli;
    };
    function liCompilerWithoutTitle(info) {
        let newli = document.createElement('li');
        newli.innerHTML = info;
        return newli;
    };

    newh2.innerHTML = temple.name;
    newsection.appendChild(newh2);
    newh3.innerHTML = temple.history.One_Liner;
    newsection.appendChild(newh3);
    newimg.setAttribute('src', temple.photo);
    newimg.setAttribute('alt', `Image of the ${temple.name} Temple.`);
    newimg.setAttribute('loading', 'lazy');
    newsection.appendChild(newimg);



    document.querySelector('#temple-sub-main').appendChild(newsection);
    
};

let requestThis = '../Assets/JSON/temples_file.json';
// const cards = ...;
fetch(requestThis)
    .then(function (response) {
        return response.json()
    })
    .then(function (jsonObj) {
        const temples = jsonObj['temples'];
        console.log(temples);
        if(currentWindow == '/wdd230/The-Temple-Inn-&-Suites/Temple/index.html' || currentWindow == '/The-Temple-Inn-&-Suites/Temple/index.html') {
            temples.forEach(smallCardBuilder)
        } else if(currentWindow == '/wdd230/The-Temple-Inn-&-Suites/Temple/Lima_Peru.html') {
            temples[0](fullCardBuilder)
        } else if(currentWindow == '/wdd230/The-Temple-Inn-&-Suites/Temple/Papeete_Tahiti.html') {
            temples[1](fullCardBuilder)
        } else if(currentWindow == '/wdd230/The-Temple-Inn-&-Suites/Temple/Oakland_California.html') {
            temples[2](fullCardBuilder)
        } else if(currentWindow == '/wdd230/The-Temple-Inn-&-Suites/Temple/Manila_Philippines.html') {
            temples[3](fullCardBuilder)
        };
    });