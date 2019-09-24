function random_int(i) {
    return ( Math.floor(Math.random() * i))
}

let words = [
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

let writing_sounds = [
    new Audio('./Sounds/write-chalk.wav'),
    new Audio('./Sounds/writing-sound2.wav'),
    new Audio('./Sounds/writing-sound3.wav'),
    new Audio('./Sounds/writing-sound4.wav'),
]
let winning_sound = new Audio('./Sounds/you-win.wav');
let game_has_ended = false;

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

let attempts = word_letters.size * 2;
let attempts_elem = document.getElementById('attempts');

let hangman_image = document.getElementById('hangman-image');

let custom_words = document.querySelector('input[type="file"]');

custom_words.addEventListener('change', function() {
    let reader = new FileReader();
    reader.onload = function(){
        words = reader.result.split(',\n');
        words.pop();
    }
    reader.readAsText(custom_words.files[0])
})


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
    get_image();

    if (word_letters.size === correct_guesses.size) {
        hangman_image.src = './Images/won_game.png';
        // playground_elem.innerHTML = '¡Ganaste!';
    }
    else if ( attempts === 0 ) {
        playground_elem.innerHTML = 'Perdiste...';
        if (!game_has_ended){
            losses++;
        }
        game_has_ended = true;
    }

}

function get_image() {
    if (attempts === 0) {
        hangman_image.src = './Images/lost_game.png';
    }
    else if (attempts === word_letters.size * 2) {
        hangman_image.src = './Images/start_game.png';
    }
    else {
        for ( i = 1; i < 6; i++) {
            if (attempts <= (word_letters.size * 2) * (i / 6) ) {
                hangman_image.src = `./Images/hangman_${i}.png`;
                break;
            }
        }
    }
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

    game_has_ended = false;
    hangman_image.src = './Images/start_game.png';

    attempts = word_letters.size * 2;
}

// event catchers

document.addEventListener('keyup', function( pressed ) {
    // On repeated key press

    if ( pressed.key === 'Enter' ) {
        restart();
    }
    else if (game_has_ended) {
        1 === 1;
    }
    else if (played_letters.has(pressed.key)) {
        1 === 1;
    } 
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
            wins++;
            winning_sound.play();
        } else {
            writing_sounds[random_int(writing_sounds.length)].play();
        }
    }
    // On incorrect guess
    else {
        if (correct_guesses.size === word_letters.size) {
            1===1;
        } else {
            played_letters.add(pressed.key);
            if (attempts > 0) {
                attempts--;
            }
        }
    }
    update();
})

start_game();