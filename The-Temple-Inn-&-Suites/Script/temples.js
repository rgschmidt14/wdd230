/*Temples cards builder*/
function smallCardBuilder(temple) {
    let newsection = document.createElement('section');
    let newh2 = document.createElement('h2');
    let newh3 = document.createElement('h3');
    let newimg = document.createElement('img');

    newh2.innerHTML = temple.name;
    newsection.appendChild(newh2);
    newh3.innerHTML = temple.history.One_Liner;
    newsection.appendChild(newh3);
    newimg.setAttribute('src', temple.photo);
    newimg.setAttribute('alt', `Image of the ${temple.name} Temple.`);
    newimg.setAttribute('loading', 'lazy');
    newsection.appendChild(newimg);



    document.querySelector('#temple-main').appendChild(newsection);
    
};

let requestThis = '../Assets/JSON/temples_file.json';
// const cards = ...;
fetch(requestThis)
    .then(function (response) {
        return response.json()
    })
    .then(function (jsonObj) {
        const temples = jsonObj['temples'];
        temples.forEach(smallCardBuilder)
        console.log(window.location.pathname)
    });
