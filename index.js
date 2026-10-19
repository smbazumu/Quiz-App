const quizData = {
    general: {
        title: "General Knowledge",
        questions: [
            { q: "Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter", "Mercury"], correct: 1 },
            { q: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: 2 },
            { q: "What is the largest ocean on Earth?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
            { q: "Which language has the most native speakers?", answers: ["English", "Spanish", "Mandarin Chinese", "Arabic"], correct: 2 },
            { q: "What is the capital of Japan?", answers: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"], correct: 1 }
        ]
    },
    science: {
        title: "Science",
        questions: [
            { q: "What gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correct: 2 },
            { q: "What is H₂O commonly called?", answers: ["Salt", "Water", "Oxygen", "Hydrogen"], correct: 1 },
            { q: "How many bones are in the adult human body?", answers: ["186", "206", "226", "246"], correct: 1 },
            { q: "What force keeps planets in orbit?", answers: ["Friction", "Magnetism", "Gravity", "Pressure"], correct: 2 },
            { q: "Which organ pumps blood around the body?", answers: ["Lungs", "Brain", "Liver", "Heart"], correct: 3 }
        ]
    },
    history: {
        title: "History",
        questions: [
            { q: "Which ancient civilization built the pyramids at Giza?", answers: ["Romans", "Egyptians", "Greeks", "Mayans"], correct: 1 },
            { q: "Who was the first person to walk on the Moon?", answers: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"], correct: 2 },
            { q: "The Renaissance began primarily in which country?", answers: ["France", "Italy", "Germany", "Spain"], correct: 1 },
            { q: "The Great Wall is located in which country?", answers: ["China", "India", "Japan", "Mongolia"], correct: 0 },
            { q: "Which city was buried by Mount Vesuvius in AD 79?", answers: ["Athens", "Pompeii", "Sparta", "Carthage"], correct: 1 }
        ]
    },
    technology: {
        title: "Technology",
        questions: [
            { q: "What does HTML stand for?", answers: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Text Management Language", "Home Tool Markup Language"], correct: 0 },
            { q: "Which language is primarily used to style web pages?", answers: ["HTML", "CSS", "SQL", "Python"], correct: 1 },
            { q: "What does CPU stand for?", answers: ["Central Processing Unit", "Computer Personal Unit", "Core Program Utility", "Central Program User"], correct: 0 },
            { q: "Which is a JavaScript framework/library?", answers: ["React", "Django", "Laravel", "Rails"], correct: 0 },
            { q: "What does URL stand for?", answers: ["Universal Reading Link", "Uniform Resource Locator", "User Resource Line", "Unified Reference Language"], correct: 1 }
        ]
    }
}

const homeScreen = document.querySelector(".allSections")
const quizScreen = document.querySelector(".quizQuestions")
const resultScreen = document.querySelector(".result")
const category = document.querySelectorAll(".category")
const checkAnswer = document.querySelector(".checkAnswer")
const scoreRemark = document.querySelector(".remark")
const quizScore = document.querySelector(".score")
const toSumUp = document.querySelector(".howManyRight")
const tryAgain = document.querySelector(".tryAgain")
const chooseElse = document.querySelector(".backtoBaseButton")
const numQuest = document.querySelector(".numQuest")
const totalQuest = document.querySelector(".totalQuest")
const theme = document.getElementById("theme")

let themeStatus = false
let currentCategory = null
let currentQuestion = 0
let score = 0
let selectedAnswer = null

category.forEach(card => {
    card.addEventListener('click', () => {
        startQuiz(card.dataset.category)
    })
})

function startQuiz(category) {
    currentCategory = quizData[category]
    currentQuestion = 0
    score = 0
    showScreen(quizScreen)
    renderQuestion()
}

function showScreen(screen) {
    [homeScreen, quizScreen, resultScreen].forEach(screens => screens.classList.remove("active"))
    screen.classList.add("active")
}

function renderQuestion() {
    quizScreen.innerHTML = ""
    const item = currentCategory.questions[currentQuestion]
    selectedAnswer = null

    const headQuiz = document.createElement("div")
    const backtoBaseButton = document.createElement("button")
    const totalQuestions = document.createElement("span")
    const progressBar = document.createElement("input")
    const quizQuestion = document.createElement("div")
    const questionNumber = document.createElement("p")
    const quizQuestionNum = document.createElement("h1")
    const checkAnswer = document.createElement("button")

    progressBar.type = 'range'
    progressBar.id = 'progressBar'
    progressBar.value = String(currentQuestion + 1)
    progressBar.min = '0'
    progressBar.max = `${currentCategory.questions.length}`

    backtoBaseButton.className = 'headQuizButton'
    headQuiz.className = 'headQuiz'
    totalQuestions.className = 'totalQuestions'
    quizQuestion.className = 'quizQuestion'
    questionNumber.className = 'questionNumber'
    quizQuestionNum.className = 'quizQuestionNum'
    checkAnswer.className = 'checkAnswer'

    backtoBaseButton.textContent = "← Categories"
    totalQuestions.textContent = `Quest ${currentQuestion + 1} of ${currentCategory.questions.length}`
    questionNumber.textContent = String(currentQuestion + 1).padStart(2, '0')
    checkAnswer.textContent = 'Check Answer'
    quizQuestionNum.textContent = item.q

    headQuiz.appendChild(backtoBaseButton)
    headQuiz.appendChild(totalQuestions)
    quizQuestion.appendChild(questionNumber)
    quizQuestion.appendChild(quizQuestionNum)
    quizScreen.appendChild(headQuiz)
    quizScreen.appendChild(progressBar)
    quizScreen.appendChild(quizQuestion)
    quizScreen.appendChild(checkAnswer)

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button")
        button.className = 'quizAnswers'
        button.textContent = answer
        button.addEventListener('click', () => {
            selectAnswer(index)
        })
        quizQuestion.appendChild(button)
    })

    checkAnswer.addEventListener('click', () => {
        const item = currentCategory.questions[currentQuestion]
        document.querySelectorAll(".quizAnswers")[item.correct].classList.add("correct")

        if (selectedAnswer === item.correct) {
            score++
        } else {
            document.querySelectorAll(".quizAnswers")[selectedAnswer].classList.add("wrong")
        }

        selectedAnswer = null
        setTimeout(() => {
            if (currentQuestion < currentCategory.questions.length - 1) {
                currentQuestion++
                renderQuestion()
            } else {
                showResult()
            }
        }, 1843)
    })

    document.querySelector(".headQuizButton").addEventListener('click', () => {
        showScreen(homeScreen)
    })
}

function selectAnswer(index) {
    selectedAnswer = index
    document.querySelectorAll(".quizAnswers")[index].classList.add("selected")
    if (currentQuestion === currentCategory.questions.length - 1) {
        document.querySelector(".checkAnswer").textContent = "Finish Quiz"
    } else {
        document.querySelector(".checkAnswer").textContent = "Check Answer"
    }
}

function showResult() {
    showScreen(resultScreen)
    const total = currentCategory.questions.length
    quizScore.textContent = `${score}`
    toSumUp.textContent = `${score}`
    numQuest.textContent = `/${total}`
    totalQuest.textContent = `${total}`

    if (score === total) {
        scoreRemark.textContent = "Perfect Score!"
    } else if (score >= Math.ceil(total * .6)) {
        scoreRemark.textContent = "Nice Work!"
    } else {
        scoreRemark.textContent = "Keep Practicing!"
    }
}

tryAgain.addEventListener('click', () => {
    currentQuestion = 0
    score = 0
    showScreen(quizScreen)
    renderQuestion()
})

chooseElse.addEventListener('click', () => {
    showScreen(homeScreen)
})

theme.addEventListener('click', () => {
    if (themeStatus === false) {
        document.body.classList.add("dark")
        theme.src = "icon-sun.svg"
        themeStatus = true
    } else {
        document.body.classList.remove("dark")
        theme.src = "icon-moon.png"
        themeStatus = false
    } 
})