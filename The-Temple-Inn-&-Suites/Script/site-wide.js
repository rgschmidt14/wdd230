




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