// Start button on click callback function. It triggers the
// "start function."
document.getElementById("start-bttn").onclick = function () {
    word.start();
    // On key pressed callback function. It triggers the "guessLetter" function.
    document.onkeyup = function () {
        word.guessLetter();
    };
};

// Creation of "word" object to include all related variables
// and functions inside.
var word = {
    // WORDS-MATRIX>> This array contains all the words to guess.
    wordsMatrix: ["Planetoid", "Bosson", "Charm", "Strange",
        "Nova", "Quark", "Ultraviolet", "Antimatter", "Doppler",
        "Lepton"
    ],
    // RANDOM-NUMBER>> Automatically generated number.
    rndNumber: function () {
        return Math.floor(Math.random() * (10 - 0));
    },
    // CHOSEN-WORD>> Word from the matrix in Uppercase.
    chWord: "",
    // GUESSED-WORD>> Array composed by as 
    // many "?" as the chWord length.
    guessWord: [],
    // CHOSEN-WORD-ARRAY>> Chosen word in
    // array format.
    chWordArray: [],
    // CHOSEN-WORD-LETTERS>> Any one of the
    // letters contained in the chWord.
    chWordLetter: "",
    // GUESSED-WORD>> Array composed by as 
    // many "?" as the chWord length.
    guessWordToStr: "",
    // An array that will store all the pressed
    // keys that don't belong to the chWord.
    wrongLetters: [],
    //wL = WORD-LENGHT>> Counter for looping through chWord
    // length.
    wL: 0,
    // PRESSED-KEY-COUNTER>> Diminishes its value each
    // time a key has been pressed.
    pKCount: 5,
    // RIGHT-LETTER-COUNT>> A counter for
    // the letters that do belong to the chWord.
    rLetCount: 0,

    start: function () {
        this.guessWord = [];
        this.chWordArray = [];
        this.chWord = this.wordsMatrix[this.rndNumber()].toUpperCase();
        console.log(this.chWord);
        console.log(this.chWord.length);

        for (this.wL = 0; this.wL < this.chWord.length; this.wL++) {
            this.guessWord.push("?");
            this.chWordLetter = this.chWord.charAt(this.wL);
            this.chWordArray.push(this.chWordLetter);
        };
        this.guessWordToStr = this.guessWord.join("-");
        document.getElementById("word").innerHTML = ">> " + this.guessWordToStr + " <<";
        this.wrongLetters = [];
        document.getElementById("pressedKeys").value = this.wrongLetters.join("-");
        this.pKCount = 5;
        this.rLetCount = 0;
    },

    guessLetter: function () {
        // pressedKey = PRESSED-KEY>> Stores the keybord key pressed
        // in uppercase.
        var pressedKey = event.key.toUpperCase();
        // console.log(pressedKey);
        // rightLetter = RIGHT-LETTER>> Stores the pressed key when
        // it does exist in the chWord.
        var rightLetter;
        // checkLetter = CHECKED-LETTER>> A boolean var that will 
        // test whether the pressed key exists somewhere in the
        // chWord. 2
        var checkLetter;
        
        for (this.wL = 0; this.wL < this.chWord.length; this.wL++) {
            this.chWordLetter = this.chWordArray[this.wL];
           
            if (pressedKey === this.chWordLetter) {
                rightLetter = this.wL;
                this.guessWord[rightLetter] = pressedKey;
                this.guessWordToStr = this.guessWord.join("-");
                document.getElementById("word").innerHTML = ">> " + this.guessWordToStr + " <<";
                var checkLetter = this.guessWord.includes(pressedKey);
               
                if (this.guessWord.indexOf("?") < 0) {
                    document.getElementById("word").innerHTML = ">> Congrats!!! You've guessed it!! <<";
                    GameOver();
                };
           
            } else {
                checkLetter = this.chWordArray.includes(pressedKey);
               
                if (checkLetter === false) {
                    checkLetter = this.wrongLetters.includes(pressedKey);
                   
                    if (checkLetter === false) {
                        this.wrongLetters.push(pressedKey);
                        document.getElementById("pressedKeys").value = this.wrongLetters.join("-");
                        this.pKCount--;
                       
                        if (this.pKCount < 0) {
                            document.getElementById("word").innerHTML = ">> You have lost!! )= <<";
                            GameOver();
                        };
                    };
                };
            };
        };
    },
};

// Reset everything after either winning or loosing.
function GameOver() {
    word.chWord = "";
    word.chWordArray = [];
    word.chWordLetter = "";
    word.guessWord = [];
    word.guessWordToStr = "";
    word.wrongLetters = [];
    document.onkeyup = function () {
        // Stop the guessLeter function.
    };
};