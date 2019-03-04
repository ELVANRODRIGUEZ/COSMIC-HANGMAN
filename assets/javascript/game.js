document.onkeyup = function () {
    guessLetter()
};

// WORDS-MATRIX>> This array contains all the words to guess.
var wordsMatrix = ["Planetoid", "Bosson", "Charm", "Strange",
    "Nova", "Quark", "Ultraviolet", "Antimatter", "Doppler",
    "Lepton"
];

function greetings() {
    console.log("Hi! Welcome to Cosmic Hangman")
};
// Start button on click callback function. It triggers the
// "start function."
document.getElementById("start-bttn").onclick = function () {
    start()
};

var chWord; // CHOSEN-WORD>> Word from the matrix in Uppercase.
var chWordArray = []; // CHOSEN-WORD-ARRAY>> Chosen word in
// array format.
var chWordLetter; // CHOSEN-WORD-LETTERS>> Any one of the
// letters contained in the chWord. 
var guessWord = []; // GUESSED-WORD>> Array composed by as 
// many "?" as the chWord length.
var guessWordToStr; // GUESSED-WORD-TO-STRING>> guessWord 
// converted to a string so it can be shown in the document.
var wrongLetters = []; // An array that will store all the pressed
// keys that don't belong to the chWord.
var wL; //wL = WORD-LENGHT>> Counter for looping through chWord
// length.
var pKCount; // PRESSED-KEY-COUNTER>> Diminishes its value each
// time a key has been pressed.
var rLetCount; // RIGHT-LETTER-COUNT>> A counter for
// the letters that do belong to the chWord.

function start() {
    // rndNumber = RANDOM-NUMBER>> Is an operation that will
    // randmoly choose a word from the wordsMatrix.
    var rndNumber = Math.floor(Math.random() * (10 - 0));
    // console.log(rndNumber);
    chWord = wordsMatrix[rndNumber].toUpperCase();
    console.log(chWord);
    guessWord = [];
    chWordArray = [];

    for (wL = 0; wL < chWord.length; wL++) {
        guessWord.push("?");
        chWordLetter = chWord.charAt(wL);
        chWordArray.push(chWordLetter);
    };

    guessWordToStr = guessWord.join("-");
    // console.log(chWord.length);
    // console.log(guessWordToStr);
    // console.log(chWordArray.length);
    document.getElementById("word").innerHTML = ">> " + guessWordToStr + " <<";
    wrongLetters = [];
    document.getElementById("pressedKeys").value = wrongLetters.join("-");
    pkCount = 5;
    // rLetCount = RIGHT-LETTER-COUNT>> A counter for
    // the letters that do belong to the chWord.
    rLetCount = 0;
};

function guessLetter() {
    // pressedKey = PRESSED-KEY>> Stores the keybord key pressed
    // in uppercase.
    var pressedKey = event.key.toUpperCase();
    // console.log(pressedKey);
    // rightLetter = RIGHT-LETTER>> Stores the pressed key when
    // it does exist in the chWord.
    var rightLetter;
    // checkLetter = CHECKED-LETTER>> A boolean var that will 
    // test whether the pressed key exists somewhere in the
    // chWord. 
    var checkLetter;

    for (wL = 0; wL < chWord.length; wL++) {
        chWordLetter = chWordArray[wL];
        // console.log(chWordLetter);
        if (pressedKey === chWordLetter) {
            // console.log("I went through Yes");
            rightLetter = wL;
            guessWord[rightLetter] = pressedKey;
            guessWordToStr = guessWord.join("-");
            // console.log("Yes! There is an " + pressedKey);
            // console.log("Its index is " + rightLetter);
            // console.log(guessWord);
            document.getElementById("word").innerHTML = ">> " + guessWordToStr + " <<";
            rLetCoun = rLetCount++;
            // console.log(rLetCount);
            if (rLetCount === chWord.length) {
                console.log("Congrats!!! You've guessed it!!")
                document.getElementById("word").innerHTML = ">> Congrats!!! You've guessed it!! <<";
                GameOver();
            };
        } else {
            checkLetter = chWordArray.includes(pressedKey);
            // console.log("I went through No");
            if (checkLetter === false) {
                checkLetter = wrongLetters.includes(pressedKey);
                if (checkLetter === false) {
                    wrongLetters.push(pressedKey);
                    document.getElementById("pressedKeys").value = wrongLetters.join("-");
                    pkCount--;
                    console.log(pkCount);
                    if (pkCount < 0) {
                        console.log("You have lost!");
                        document.getElementById("word").innerHTML = ">> You have lost!! )= <<";
                        GameOver();
                    };
                };
            };
        };
    };
};

function GameOver() {
    chWord = "";
    chWordArray = [];
    chWordLetter = "";
    guessWord = [];
    guessWordToStr = "";
    wrongLetters = [];
    // document.getElementById("word").innerHTML = ">> <<";
} 