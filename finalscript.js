// FULL SCRIPT -- COMPLETED 09/02//

const question = document.querySelector('#question');
const potentialAnswers = Array.from(document.querySelectorAll('.potentialAnswers-text'));
const progText = document.querySelector('#progText');
const scoreText = document.querySelector('#score');
const progBarFull = document.querySelector('#progBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [...questionsList]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = -1
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter === MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    potentialAnswers.forEach(potentialAnswer => {
        const number = potentialAnswer.dataset['number']
        potentialAnswer.innerText = currentQuestion['potentialAnswer' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

potentialAnswers.forEach(potentialAnswer => {
    potentialAnswer.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedPotentialAnswer = e.target
        const selectedAnswer = selectedPotentialAnswer.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.correct ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedPotentialAnswer.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedPotentialAnswer.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
