document.onkeyup = function() {guessLetter()};

var wordsMatrix = ["Planetoid","Bosson","Charm","Strange",
        "Nova","Quark","Ultraviolet","Antimatter","Doppler",
        "Lepton"];

function greetings() {    
    console.log("Hi! Welcome to Cosmic Hangman")
    };

document.getElementById("start-bttn").onclick = function(){start()};

var chWord;
var chWordArray = [];
var chWordLetters;
var guessWord = [];
var guessWordToStr;
var wrongLetters = [];

function start() {
    var rndNumber = Math.floor(Math.random() * (10 - 0));
    // console.log(rndNumber);
    chWord = wordsMatrix[rndNumber].toUpperCase();
    console.log(chWord);
    guessWord = [];
    chWordArray = [];

    for (var wL = 0; wL < chWord.length; wL++) {
        guessWord.push("?");
        chWordLetters = chWord.charAt(wL);
        chWordArray.push(chWordLetters);
    };
    
    guessWordToStr = guessWord.join("-");
    console.log(chWord.length);
    // console.log(guessWordToStr);
    // console.log(chWordArray.length);
    document.getElementById("word").innerHTML = guessWordToStr;
    wrongLetters = [];
};

function guessLetter() {
    var pressedKey = event.key.toUpperCase();
    console.log(pressedKey);
    var rightLetter;
    var CheckLetters;
    for (var gWordL = 0; gWordL < chWordArray.length; gWordL++) {
        chWordLetters = chWordArray[gWordL];
        console.log(chWordLetters);
        if (pressedKey === chWordLetters) {
            console.log("I went through Yes");
            rightLetter = gWordL;
            guessWord[rightLetter] = pressedKey;
            // console.log("Yes! There is an " + pressedKey);
            // console.log("Its index is " + rightLetter);
            // console.log(guessWord);
            document.getElementById("word").innerHTML = guessWord;
        } else {
            CheckLetters = chWordArray.includes(pressedKey);
            console.log("I went through No");
            if (CheckLetters === true) {
                console.log("It is part of the word.");
            } else {
                CheckLetters = wrongLetters.includes(pressedKey);
                if (CheckLetters === true) {
                    console.log("It is already included.");
                } else {       
                    wrongLetters.push(pressedKey);
                    document.getElementById("pressedKeys").value = wrongLetters.join("-");
                };
            };
        };
    };
};
