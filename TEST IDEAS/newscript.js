// SOMEWHAT SIMPLIFIED VERSION OF 'TESTSCRIPT.JS'
// SAME ISSUES OCCURED WITH .JSON 'FETCH' 
// CODED MORE OF THIS MYSELF COMPARED TO 'TESTSCRIPT.JS' IN AN ATTEMPT TO REVERSE ENGINEER TO WORK OUT ISSUES

const question = document.querySelector("question");
const answers = Array.from(document.querySelectorAll('.answer-text'));
const progText = document.querySelector('#progressText');
const scoreText = document.querySelector('#scoreText');
const progBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let questionsIndex = -1;
let submittedAnswers = {};

fetch ('./questions.json')
.then (res => {
    return res.json();
})
.then (loadedQuestions => { 
    questions = loadedQuestions;
    startGame();

}).catch ( err => {
    console.log(err);
})

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 8;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progText.innerText = `questions ${questionCounter} of ${MAX_QUESTIONS}`
    progBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    answers.forEach(answer => {
        const number = answer.dataset['number']
        answer.innerText = currentQuestion['answer' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

answers.forEach(answer => {
    answer.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedAnswer = e.target
        const selectedAnswer = selectedAnswer.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedAnswer.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedAnswer.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()