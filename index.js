// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
 */
function processFirstItem(stringList, callback) {
    return callback(stringList[0])
}

// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 *      counter1 uses a closure to continue updating the count variable's value. counter2, however, places count in the global scope to retain the variables value. 
 * 2. Which of the two uses a closure? How can you tell?
 *      counter1 invokes the counterMaker function which has a function nested inside of it. Nesting a function inside of another funciton is called a closure. 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 *      counter1 would be used when you want to keep the count variable private and out of the global scope. For example, you could use it when you have two similar functions  and you would like to use the count variable in each function without them interfering with each other. 
 */

// counter1 code
function counterMaker() {
    let count = 0;
    return function counter() {
        return count++;
    }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
    return count++;
}


/* Task 2: inning() 

Write a function called `inning` that returns a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */
function inning() {
    return Math.floor(Math.random() * 3);
}
console.log(inning());


/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/

// I have no idea how baseball works but trying my best here!
function finalScore(cb, inningCount) {
    let homeScore = 0;
    let awayScore = 0;
    for (let i = 0; i < inningCount; i++) {
        homeScore += cb(inningCount);
        awayScore += cb(inningCount);
    }
    return { home: homeScore, away: awayScore };
}

console.log(finalScore(inning, 9));

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(3) A number of innings

and returns the score at each pont in the game, like so:
1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam
Final Score: awayTeam - homeTeam */

// Hopefully I did this right. Super confused on baseball and the instructions. 
function scoreboard(getInningScore, inning, inningCount) {
    let scores = [];

    for (let i = 0; i < inningCount; i++) {
        scores.push(getInningScore(inning, 1));
    }

    let homeFinal = 0;
    let awayFinal = 0;

    for (i in scores) {
        homeFinal += scores[i].home;
        awayFinal += scores[i].away;
    }

    return function() {
        for (let i = 0; i < scores.length; i++) {
            console.log(`Inning ${i+1}: ${scores[i].away} - ${scores[i].home} \n`);
        }
        console.log(`Final Score: ${awayFinal} - ${homeFinal}`);
    }
}

scoreboard(finalScore, inning, 9)();

// Stretch #2 
function createBase(num) {
    return function(num2) {
        return num + num2;
    }
}

let addSix = createBase(6);
console.log(addSix(10)); // returns 16
console.log(addSix(21)); // returns 27