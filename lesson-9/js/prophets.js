const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
const cards = document.querySelector('.cards');
fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject); //temporary to check it worked in valid format
        const prophets = jsonObject['prophets'];
        prophets.forEach(displayProphets);
    });

function ordinalNumberFix(number) {
    if (number > 3 && number < 21) return `${number}th`;
    switch (number % 10) {
        case 1: return `${number}st`;
        case 2: return `${number}nd`;
        case 3: return `${number}rd`;
        default: return `${number}th`;
    } 
}
function displayProphets(prophet) {
    //creating elements to insert
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let ul = document.createElement('ul');
    let portrait = document.createElement('img');

    //adding Prophet's full name to the h2 property
    prophet.fullname = `${prophet.name} ${prophet.lastname}`;
    h2.textContent = prophet.fullname;

    //Function to add info to card's ul
    function liAdder(title, info) {
        let li = document.createElement('li');
        li.textContent = `${title}${info}`;
        return li;
    };

    //adding info about prophet in li format to the ul //copy and paste to add more
    ul.appendChild(liAdder("My Birthday: ", prophet.birthdate));
    ul.appendChild(liAdder("I was born in : ", prophet.birthplace));

    //using setAttribute to make the image show up with alt text and a lazy load fashion
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.fullname} the ${ordinalNumberFix(prophet.order)} Latter-day President`);
    portrait.setAttribute('loading', 'lazy');

    //adding the h2 and portrait(img) elements to the card
    card.appendChild(h2);
    card.appendChild(ul)
    card.appendChild(portrait);

    //Adding the card to the html with all of its children
    document.querySelector('div.cards').appendChild(card);
};