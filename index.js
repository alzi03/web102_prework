/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");


// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let game of games){
        let div = document.createElement('div')
        div.classList.add('game-card')
        div.innerHTML = `<img src=${game.img} class="game-img" alt=img> <p>Name:${game.name}</p><p>Description:${game.description}</p>`
        gamesContainer.appendChild(div)
    }

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON)

const games = document.querySelectorAll('.game-card')
console.log(games)
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
let contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const total = GAMES_JSON.reduce((p, n) => { return p + n.backers },0);
contributionsCard.textContent = total


// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `${total.toLocaleString('en-US')}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let raised = GAMES_JSON.reduce((p,n) =>{ return p + n.pledged },0)


// set inner HTML using template literal

raisedCard.innerHTML = `$${raised.toLocaleString('en-US')}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let numgames = GAMES_JSON.length
gamesCard.innerHTML = `${numgames.toLocaleString('en-US')}`





/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

   const notFunded = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal
    })


    // use the function we previously created to add the unfunded games to the DOM

    addGamesToPage(notFunded)

}

filterUnfundedOnly()
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);


    // use filter() to get a list of games that have met or exceeded their goal

    const funded = GAMES_JSON.filter( (game) => {
        return game.pledged >= game.goal
    })


    // use the function we previously created to add unfunded games to the DOM

    addGamesToPage(funded)

}
// filterFundedOnly()
// show all games

function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

    addGamesToPage(GAMES_JSON)

}
showAllGames()
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly)
fundedBtn.addEventListener('click', filterFundedOnly)
allBtn.addEventListener('click', showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unfunded = GAMES_JSON.filter( (game) => {
    if (game.pledged < game.goal){
        return true
    }
}, 0).length

console.log(unfunded)

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of ${raisedCard.textContent} has been raised for ${numgames} games. Currently, ${unfunded} games remain unfunded. We need your help to fund these amazing games!`

console.log(displayStr)

// create a new DOM element containing the template string and append it to the description container
const p = document.createElement('p')
p.innerHTML = `${displayStr}`
descriptionContainer.appendChild(p)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

console.log(sortedGames)
let [one, two] = sortedGames



// create a new element to hold the name of the top pledge game, then append it to the correct element
const div = document.createElement('div')
div.textContent = one.name
firstGameContainer.appendChild(div)

// do the same for the runner up item

const div2 = document.createElement('div')
div2.textContent = two.name
secondGameContainer.appendChild(div2)

// bonus

const buttons = [unfundedBtn, fundedBtn, allBtn]

function removeBg(){
    for (let button of buttons){
        button.classList.remove('clicked')
    }
}

buttons.forEach(button => button.addEventListener('click', function(e){
    removeBg()
    this.classList.add('clicked')
}))
