function random_int(i) {
    return ( Math.floor(Math.random() * i))
}

let words = [
    'c',
    'vim',
    'node',
    'linux',
    'react',
    'debian',
    'angular',
    'flutter',
    'big data',
    'algorithm',
    'encrypted',
    'blockchain',
    'full stack',
    'typescript',
    'javascript',
    'mathematics',
    'decentralized',
    'machine learning',
];

let writing_sound = new Audio('./Sounds/write-chalk.wav');
let winning_sound = new Audio('./Sounds/you-win.wav');

let current_guess = '';
let word = words[random_int(words.length)];
let hidden_word = '';
let listed_word = word.split('');

let word_letters = new Set(listed_word);
let played_letters = new Set([]);
let correct_guesses = new Set([]);
let played_letters_elem = document.getElementById('played_letters');

let playground_elem = document.getElementById("playground");

let wins = 0;
let wins_elem = document.getElementById('wins');
let losses = 0;
let losses_elem = document.getElementById('losses');

let attempts = word.length * 3;
let attempts_elem = document.getElementById('attempts');

function hide_word(word) {
    for (i = 0; i < word.length; i++) {
        hidden_word += '-';
    } return hidden_word;
}

function update() {
    playground_elem.innerHTML = hidden_word;
    wins_elem.innerHTML = wins;
    losses_elem.innerHTML = losses;
    attempts_elem.innerHTML = attempts;
    let played = '';
    played_letters.forEach( letter => {
        played += `${letter}, `
    })
    played_letters_elem.innerHTML = played;
}


function get_positions(letter) {
    let positions = [];
    for ( i = 0; i < word.length; i++ ) {
        if (word[i] === letter) {
            positions.push(i);
        }
    } return positions;
}

function start_game() {
    hidden_word = hide_word(word);
    playground_elem.innerHTML = hidden_word;
}

function restart() {
    word = words[random_int(words.length)];
    hidden_word = '';
    hidden_word = hide_word(word);
    listed_word = [];
    listed_word = word.split('');
    word_letters = new Set(listed_word);
    // Reset played characters
    played_letters.clear();
    correct_guesses.clear();

    attempts = word.length * 3;
}

document.addEventListener('keyup', function( pressed ) {
    // On repeated key press
    if (played_letters.has(pressed.key)) {
        // alert('¡Ya intentaste con esta letra!');
    } 
    else if (attempts <= 0) {
        alert(`Intenta otra vez, la palabra era ${word}`);
        restart();
    }
    // On correct guess
    else if (word_letters.has(pressed.key)) {

        played_letters.add(pressed.key);
        correct_guesses.add(pressed.key);

        let reveal = hidden_word.split('');
        hidden_word = '';

        get_positions(pressed.key).forEach( position => {
            reveal[position] = pressed.key;
        })
        reveal.forEach( char => {
            hidden_word += char;
        })
        // If he already won
        if ( correct_guesses.size === word_letters.size ) {
            // alert('¡Ganaste 50 puntos imaginarios!');
            wins++;
            // restart();
            playground_elem.innerHTML = '¡GANASTE!';
            winning_sound.play();
        } else {
            writing_sound.play();
            playground_elem.innerHTML = hidden_word;
        }
    }
    // On incorrect guess
    else {
        played_letters.add(pressed.key);
        attempts--;
    }

    update();
})

start_game();