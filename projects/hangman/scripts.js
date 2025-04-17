const letters_guessed = document.getElementById("letters_guessed");
const update = document.getElementById("update");
const all_words = ["GINGHAM", "REPTILES", "SOURDOUGH", "ISOPOD", "DUSTY"];
var guess = document.getElementById("guess");
var word = [];

const inc_guess_limit = 6; // # of incorrect guesses to = failure

var user_guesses = 0; // # of guesses made by user
var incorrect_guesses = 0; // # of incorrect letters guessed
var correct_guesses = 0; // # of correct letters guessed
var all_letters = []; // all letters guessed
var incorrect_letters = []; // array of incorrect letters guesses

randomized_word();

function play() {
    user_guesses += 1;
    if ( all_letters.includes(guess.value.toUpperCase()) ) {
        update.innerHTML = "You already guessed that letter!";
        user_guesses -= 1; // invalid guess = subtract 1 from guess count
    } else if ( word.includes(guess.value.toUpperCase()) ) {
        update.innerHTML = "Nice guess!";
        update_correct_letters();
    } else {
        // checks that the guess is only one character, that the guess is not empty, and that the guess only contains letters:
        if ((guess.value.length > 1) || (guess.value == "") || !(guess.value.match(/[a-z]/i)) ) {
            update.innerHTML = "Invalid guess!";
            user_guesses -= 1; // invalid guess = subtract 1 from guess count
        } else {
            update.innerHTML = "Oops, try again!";
            update_incorrect_letters();
        }
    }
    // adds guess to 'all_letters' array to prevent repeats:
    all_letters.push(guess.value.toUpperCase());
    // check if game over conditions are met:
    finish();
}

// returns random int from 0 to # of words stored in all_words minus 1:
function rand() {
    let max_word_count = all_words.length - 1;
    return Math.floor(Math.random() * max_word_count);
}

// picks a random word from the array all_words:
function randomized_word() {
    let correct_guess_output = document.getElementById("correct_guess_output");
    let randomWord = rand();
    word = all_words[randomWord].split("");
    console.log(word);
    
    // displays 1x '_' per letter in the word (to be replaced with correct guesses during game):
    for(let i = 0; i < word.length; i++) {
        // i = letter/_ position
        correct_guess_output.innerHTML += `<b id="${i}">_ </b>`;
    }
}

// replaces '_' with the letter guessed:
function update_correct_letters() {
    var letter_present_index = [];
    // get the index(es) where the correct letter is in the word + store in new array letter_present_index:
    for(let idx = 0; idx < word.length; idx++) {
        if (guess.value.toUpperCase() == word[idx]) {
            letter_present_index.push(idx);
        }
    }
    // loop through word and replace '_' with correct letter when index(es) stored in letter_present_index are reached:
    for(const idx of letter_present_index) {
        correct_guesses += 1; // increase correct_guesses ct for each letter
        document.getElementById(idx).innerHTML = word[idx];
    }
}

// adds guess to incorrect_letters array + updates canvas
function update_incorrect_letters() {
    incorrect_guesses += 1;
    incorrect_letters.push(guess.value.toUpperCase());
    draw(); // update drawing with new bodypart + guess
}

// checks for game over conditions (win or lose) + allows user to play again
function finish() {
    if ( incorrect_letters.length == inc_guess_limit ) {
        update.innerHTML = `You lost...<br><button onclick="location.reload()">Play again?</button>`;
        document.getElementById("user_guess").style.display="none";
    } 
    if ( correct_guesses == word.length ) {
        update.innerHTML = `You win!!<br>It took you ${user_guesses} guesses.<br><button onclick="location.reload()">Play again?</button>`;
        document.getElementById("user_guess").style.display="none";
    }
}

// draw hangman
// body parts drawn/updated + guess displayed if incorrect_guesses increases
function draw() {
    const canvas = document.getElementById("hangman");
    const drawing_color = "#aa5595";
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        // hangman setup
        ctx.beginPath();
            ctx.strokeStyle = drawing_color;
            ctx.lineWidth = 2;

            ctx.moveTo(100,75);
            ctx.lineTo(100,50);
            ctx.lineTo(200,50);
            ctx.lineTo(200,350);

            ctx.moveTo(170,50);
            ctx.lineTo(200,85);

            ctx.moveTo(125,350);
            ctx.lineTo(250,350);
            ctx.stroke();
        ctx.closePath();

        switch(incorrect_guesses) {
            case 1: // hangman head
                ctx.beginPath();
                    ctx.arc(100, 100, 25, 0, 2 * Math.PI);
                    ctx.stroke();
                ctx.closePath();
                add_incorrect_letter(100);
                break;
            case 2: // hangman body
                ctx.beginPath();
                    ctx.moveTo(100, 125);
                    ctx.lineTo(100, 220);
                    ctx.stroke();
                ctx.closePath();
                add_incorrect_letter(120);
                break;
            case 3: // hangman left arm
                ctx.beginPath();
                    ctx.moveTo(100, 135);
                    ctx.lineTo(80, 190);
                    ctx.stroke();
                ctx.closePath();
                add_incorrect_letter(140);
                break;
            case 4: // hangman right arm
                ctx.beginPath();
                    ctx.moveTo(100, 135);
                    ctx.lineTo(120, 190);
                    ctx.stroke();
                ctx.closePath();
                add_incorrect_letter(160);
                break;
            case 5: // hangman left leg
                ctx.beginPath();
                    ctx.moveTo(100, 220);
                    ctx.lineTo(80, 280);
                    ctx.stroke();
                ctx.closePath();
                add_incorrect_letter(180);
                break;
            case 6: // hangman right leg
                add_incorrect_letter(200);    
                break;
        }
        // adds the incorrect letter to the canvas with the x axis coordinate determined at function call
        function add_incorrect_letter(x_location) {
            ctx.beginPath();
                ctx.font = "bold 1rem Roboto Slab";
                ctx.fillStyle = "#aa5595";
                ctx.fillText(incorrect_letters[incorrect_letters.length - 1],x_location, 380);
            ctx.closePath();
        }
    }
}