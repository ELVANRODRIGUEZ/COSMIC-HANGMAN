var showHideToggler = true;

// Start button on click callback function. It triggers the
// "start function."
document.getElementById("start-bttn").onclick = function () {
    document.getElementById("backSong").play();

    if (showHideToggler === true) {
        this.style.display = "none";
        document.getElementById("inst-bttn").style.display = "block";
    } else {
        start()
        // On key pressed callback function. It triggers the
        // "guessLetter" function.
        document.onkeyup = function () {
            guessLetter()
        };

    };
};

//elemToShow is an array
var elemToShow = document.getElementsByClassName("shwHid");

document.getElementById("inst-bttn").onclick = function () {
    start()
    this.style.display = "none";
    document.getElementById("start-bttn").style.display = "block";

    if (showHideToggler === true) {
        for (var elem = 0; elem < elemToShow.length; elem++) {
            elemToShow[elem].classList.toggle("show");
        };
    };

    // On key pressed callback function. It triggers the
    // "guessLetter" function.
    document.onkeyup = function () {
        guessLetter()
    };

    showHideToggler = false;
};

document.getElementById("goBack").onclick = function () {
    // Hide gameOver Jumbotron.
    document.getElementById("gameOver").style.visibility = "hidden";
    // Display everything else.
    document.getElementById("start-bttn").style.display = "block";

    for (var elem = 0; elem < elemToShow.length; elem++) {
        elemToShow[elem].classList.toggle("show");
    };

    start();
    // Reset On key pressed callback function. It triggers the
    // "guessLetter" function.
    document.onkeyup = function () {
        guessLetter()
    };
};

// WORDS-MATRIX>> This array contains all the words to guess.
var wordsMatrix = ["Planetoid", "Boson", "Charm", "Strange",
    "Nova", "Quark", "Ultraviolet", "Antimatter", "Doppler",
    "Lepton"
];

var chWordOriginal; // CHOSEN-WORD-ORIGINAL>> Word from the matrix.
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
var wins = 0; // WINS>> A counter for
// wins.
var losses = 0; // LOOSES>> A counter for
// looses.
var chWordRef; // CHOSEN-WORD-REFERENCE>> It is a link to get to know more about the chWord.

function start() {
    // Return everything to default value.
    chWord = "";
    chWordArray = [];
    chWordLetter = "";
    guessWord = [];
    guessWordToStr = "";
    wrongLetters = [];
    // Return word characters display box to "".
    document.getElementById("pressedKeys").innerHTML = "";
    // Return word character tag to (10).
    document.getElementById("wrCharCounter").innerText = "WRONG CHARACTERS (10)";
    // rndNumber = RANDOM-NUMBER>> Is an operation that will
    // randmoly choose a word from the wordsMatrix.
    var rndNumber = Math.floor(Math.random() * (10 - 0));
    chWordOriginal = wordsMatrix[rndNumber];
    // Calling function to choose reference for gameOver screen.
    chWordLink();

    chWord = wordsMatrix[rndNumber].toUpperCase();
    console.log(chWord);

    // Create the word characters array and the "?" array for
    // later displaying.   
    for (wL = 0; wL < chWord.length; wL++) {
        guessWord.push("?");
        chWordLetter = chWord.charAt(wL);
        chWordArray.push(chWordLetter);
    };

    // Display word to be guessed in "?" form.
    guessWordToStr = guessWord.join("-");
    console.log(chWordArray.length);
    document.getElementById("word").innerHTML = ">> " + guessWordToStr + " <<";
    // Set the separator for the wrong letters to be filled
    // in the display box.
    document.getElementById("pressedKeys").value = wrongLetters.join("-");
    // Set conters for chances left and right words.
    pkCount = 10;
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

        if (pressedKey === chWordLetter) {
            rightLetter = wL;
            guessWord[rightLetter] = pressedKey;
            guessWordToStr = guessWord.join("-");
            document.getElementById("word").innerHTML = ">> " + guessWordToStr + " <<";

            if (guessWord.indexOf("?") < 0) {
                wins++;
                document.getElementById("wins").innerHTML = "WINS:<br>" + wins;
                // Display gameOver Jumbotron.
                document.getElementById("gameOver").style.visibility = "visible";
                // Hide everything else.
                document.getElementById("start-bttn").style.display = "none";
                for (var elem = 0; elem < elemToShow.length; elem++) {
                    elemToShow[elem].classList.toggle("show");
                };
                // Feed the gameOver Jumbotron.
                document.getElementById("winLose").innerText = "YOU WON!!!";
                document.getElementById("gOMess").innerHTML = "As you guessed, the word was: <br><b>" + chWord + "</b>. <br>Excellent job!!! Now press <b>GO BACK</b> button to keep playing or <b>LEARN MORE</b> button to get to know what " + chWordOriginal + " actually is if you don't know already.";
                // Set the reference for the Learn More button.
                document.getElementById("learnMore").setAttribute("href", chWordRef);
                console.log(chWordRef);
                GameOver();
            };

        } else {
            checkLetter = chWordArray.includes(pressedKey);

            if (checkLetter === false) {
                checkLetter = wrongLetters.includes(pressedKey);

                if (checkLetter === false) {
                    wrongLetters.push(pressedKey);
                    document.getElementById("pressedKeys").innerHTML = wrongLetters.join("-");
                    pkCount--;
                    document.getElementById("wrCharCounter").innerText = "WRONG CHARACTERS (" + pkCount + ")";


                    if (pkCount < 0) {
                        losses++;
                        document.getElementById("losses").innerHTML = "LOSSES:<br>" + losses;
                        document.getElementById("wrCharCounter").innerText = "WRONG CHARACTERS (10)";
                        // Display gameOver Jumbotron.
                        document.getElementById("gameOver").style.visibility = "visible";
                        // Hide everything else.
                        document.getElementById("start-bttn").style.display = "none";
                        for (var elem = 0; elem < elemToShow.length; elem++) {
                            elemToShow[elem].classList.toggle("show");
                        };
                        // Feed the gameOver Jumbotron.
                        document.getElementById("winLose").innerText = "YOU LOST!!!";
                        document.getElementById("gOMess").innerHTML = "The word you missed was: <br><b>" + chWord + "</b>. <br> Don't worry, just keep trying!!! Now press <b>GO BACK</b> button to keep playing or <b>LEARN MORE</b> button to get to know what " + chWordOriginal + " actually is if you don't know already.";
                        // Set the reference for the Learn More button.
                        document.getElementById("learnMore").setAttribute("href", chWordRef);
                        console.log(chWordRef);
                        GameOver();
                    };
                };
            };
        };
    };
};

function GameOver() {
    document.onkeyup = function () {
        // Stop onkeyup function.
    };
};

function chWordLink() {
    console.log(chWordOriginal);

    switch (chWordOriginal) {
        case "Planetoid":
            chWordRef = "https://en.wikipedia.org/wiki/Minor_planet";
            break;
        case "Boson":
            chWordRef = "https://en.wikipedia.org/wiki/Higgs_boson";
            break;
        case "Charm":
            chWordRef = "https://en.wikipedia.org/wiki/Charm_quark";
            break;
        case "Strange":
            chWordRef = "https://en.wikipedia.org/wiki/Strange_matter";
            break;
        case "Nova":
            chWordRef = "https://en.wikipedia.org/wiki/Nova";
            break;
        case "Quark":
            chWordRef = "https://en.wikipedia.org/wiki/Quark";
            break;
        case "Ultraviolet":
            chWordRef = "https://en.wikipedia.org/wiki/Ultraviolet";
            break;
        case "Antimatter":
            chWordRef = "https://en.wikipedia.org/wiki/Antimatter";
            break;
        case "Doppler":
            chWordRef = "https://en.wikipedia.org/wiki/Doppler_effect";
            break;
        case "Lepton":
            chWordRef = "https://en.wikipedia.org/wiki/Lepton";
            break;
    };
};

