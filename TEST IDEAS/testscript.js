// THIS LOOKED TO MAKE USE OF THE 'FETCH' COMMAND TO DRAW QUESTIONS FROM A JSON FILE. THE ISSUES
// ARE HIGHLIGHTED HERE - https://gyazo.com/27d85730b21b3c891e5b7e56514ca347
// FROM TRYING TO TROUBLESHOOT - I BELIEVE THERE IS AN ISSUE WITH THE WAY JSON 'FETCH' WORKS.
// NOT SURE IT CAN FETCH A LOCAL FILE? 
// WHEN QUESTIONS WERE INPUTTED WITHIN THE SCRIPT ITSELF, WORKED FINE, HOWEVER OVERLY LONG FOR 
// PURPOSES HERE
// (FOR TRANSPARENCY, THIS CODE WAS EDITED FROM ANOTHER SOURCE)

const question = document.getElementById("question");
const codeBlock = document.getElementById("code-block");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const choiceContainer = Array.from(document.getElementsByClassName("choice-container"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressFull = document.getElementsByClassName("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions =[];
let questions = [];
let questionIndex = -1;
let submittedAnswers = {};

fetch ('.questions.json')
.then (res => {return res.json();
})
.then (loadedQuestions => {questions = loadedQuestions;
startGame();

}).catch ( err => {
    console.log(err);
})

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 8;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = questions;

    getNewQuestion();
    Gamepad.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem ("mostRecentScore:", score);

    return window.location.assign ("leaderboard.html");
};

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

questionIndex++;
currentQuestion = availableQuestions[questionIndex];
question.innerHTML = currentQuestion.question;
if (currentQuestion.code){
    codeBlock.src = currentQuestion.code;
}

choices.forEach((choice, index) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
    if (choice.innerText === "") {
        choice.disabled = true;
        choiceContainer[index].disabled = true;
    } else {
        choice.disabled = false;
        choiceContainer[index].disabled = false;
    }

});
acceptingAnswers = true;
clickAnswer();
};

function clickAnswer() {
    choices.forEach((choice, index) => {
        if (!(choiceContainer[index].disabled)) {
            choice.addEventListener('click', e => {
                if(!acceptingAnswers) return;
                acceptingAnswers = false;
                const selectedChoice = e.target;
                const selectedAnswer = selectedChoice.dataset["number"];  
         
                 let classToApply = "incorrect";
                 if (selectedAnswer == currentQuestion.answer) {
                     classToApply = "correct";
                 }; 

                 if (classToApply === "correct") {
                     incrementScore(CORRECT_BONUS);
                 };
         
                 submittedAnswers['Q' + (questionIndex + 1)] = (classToApply === 'correct' ? 'O' : 'X');
                 sessionStorage.setItem('submittedAnswers', JSON.stringify(submittedAnswers));
                 
                 selectedChoice.parentElement.classList.add(classToApply);

                 
                 setTimeout(() => {
                     selectedChoice.parentElement.classList.remove(classToApply);
                 
                     getNewQuestion();
                 }, 1000);
                
             });
        }
        
    });
}
      
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};