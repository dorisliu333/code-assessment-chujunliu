var startButton = document.querySelector(".startButton");
var viewScore = document.querySelector(".viewScore");
var startPage = document.querySelector("#startPage");
var highScorePage = document.querySelector("#highScoresPage");
var header = document.querySelector("#header");
var quizPage = document.querySelector("#quizPage");
var donePage = document.querySelector("#donePage");
var backButton = document.querySelector(".backButton");
var nextButton = document.querySelector(".nextButton");
var initialsSubmitButton = document.querySelector(".initialsSubmitButton")
var timeCounter = document.querySelector(".timeCounterSpan");
var initialsInput = document.querySelector(".initialsInput");
var quizPageQuestion = document.querySelector(".quizPageQuestion")
var options = document.getElementsByClassName('answer');
var quizPageContainer = document.querySelector('.quizPageContainer');
var quizPageQuestion = document.querySelector(".quizPageQuestion");
var answerSubmitButton = document.querySelector(".answerSubmitButton");
var currentScoreSpan = document.querySelector(".currentScoreSpan")
var resultDisplay = document.querySelector(".resultDisplay");
var clearScoresButton = document.querySelector(".clearScoresButton");
var highScoresContainer = document.querySelector(".highScoresContainer");

var timeCount;
var highestScore;
var currentScore = 0;
var currentInitial = "";
var index = 0;
var quizCollection = [
    {
        question: "How do you write 'Hello World' in an alert box?",
        answer: [
            "1: alertBox('Hello World')",
            "2: msgBox('Hello World')",
            "3: alert('Hello World')"
        ],
        correctAnswer: "3"
    },
    {
        question: "How do you create a function in JavaScript ?",
        answer: [
            "1: function: myFunction()",
            "2: function myFunction()",
            "3: function = myFunction()"
        ],
        correctAnswer: "2"
    },
    {
        question: "How to write an IF statement in JavaScript ?",
        answer: [
            "1: If i = 5 then",
            "2: if (i == 5)",
            "3: If i = 5"
        ],
        correctAnswer: "2"
    },
    {
        question: "How do you round the number 7.25, to the nearest integer ?",
        answer: [
            "1: Math.round(7.25)",
            "2: Math.rnd(7.25)",
            "3: round(7.25)"
        ],
        correctAnswer: "1"
    },
    {
        question: "How do you find the number with the highest value of x and y ?",
        answer: [
            "1: Math.ceil(x, y)",
            "2: Math.top(x, y)",
            "3: Math.max(x, y)"
        ],
        correctAnswer: "3"
    },]

startButton.addEventListener("click", startQuizAssessment);
viewScore.addEventListener("click", showScorePage);
backButton.addEventListener("click", showStartPage);
nextButton.addEventListener("click", replacePage);
initialsSubmitButton.addEventListener("click", submitInitial)
answerSubmitButton.addEventListener("click", submitAnswer)
clearScoresButton.addEventListener("click", clearFunction)

function showStartPage() {
    startPage.setAttribute("class", "active");
    header.setAttribute("class", "active");
    highScorePage.setAttribute("class", "inactive");
    quizPage.setAttribute("class", "inactive")
    donePage.setAttribute("class", "inactive");
    index = 0;
    timeCounter.innerHTML = 0;
    currentScore = 0;
    clearInterval(timer);
    while (quizPageContainer.hasChildNodes()) {
        quizPageContainer.removeChild(quizPageContainer.firstChild);
    }
    while (highScoresContainer.firstChild) {
        highScoresContainer.removeChild(highScoresContainer.firstChild);
    }
    initialsInput.value = ''
}

var timer;
function startQuizAssessment() {
    timeCount = 101;
    timer = setInterval(() => {
        timeCount--;
        timeCounter.innerHTML = timeCount;
        if (timeCount <= 0) {
            timeCounter.innerHTML = 0;
            clearInterval(timer);
            showDonePage();
        }
    }, 1000);
    showQuizPage()
}
function showQuizPage() {
    startPage.setAttribute("class", "inactive");
    quizPage.setAttribute("class", "active")
    addFirstQuiz();
}
function addFirstQuiz() {
    const questionElement = document.createElement('h1')
    questionElement.setAttribute("class", "quizPageQuestion")
    questionElement.innerHTML = `${quizCollection[index].question}`
    quizPageContainer.appendChild(questionElement);
    quizCollection[index].answer.map((item, optionIndex) => {
        const answerDiv = document.createElement('div');
        const answerInput = document.createElement("input")
        answerDiv.setAttribute("class", "answer")
        answerInput.setAttribute("type", "radio")
        answerInput.setAttribute("data-number", optionIndex + 1)
        answerInput.setAttribute("name", "choice")
        answerDiv.innerHTML = ` ${item}`;
        answerDiv.insertBefore(answerInput, answerDiv.firstChild);
        quizPageContainer.appendChild(answerDiv);
    });
    resultDisplay.innerHTML = '';
    answerSubmitButton.disabled = false;
}
function replacePage() {
    while (!resultDisplay.innerHTML) {
        alert('Please submit an option!')
        return;
    }
    index++;
    if (index === quizCollection.length) {
        showDonePage();
        clearInterval(timer)
        timeCounter.innerHTML = timeCount;
    }
    const prevQuestion = quizPageContainer.children[0];
    const questionElement = document.createElement('h1')
    questionElement.setAttribute("class", "quizPageQuestion")
    questionElement.innerHTML = `${quizCollection[index]?.question}`
    quizPageContainer.replaceChild(questionElement, prevQuestion);
    if (index < quizCollection.length) {
        quizCollection[index]?.answer?.map((item, optionIndex) => {
            const answerDiv = document.createElement('div');
            const answerInput = document.createElement('input');
            answerDiv.setAttribute("class", "answer");
            answerInput.setAttribute("type", "radio");
            answerInput.setAttribute("name", "choice")
            answerInput.setAttribute("data-number", optionIndex + 1);
            answerDiv.innerHTML = ` ${item}`;
            answerDiv.insertBefore(answerInput, answerDiv.firstChild);
            quizPageContainer.replaceChild(answerDiv, quizPageContainer.children[optionIndex + 1]);
        });
    }
    resultDisplay.innerHTML = '';
    answerSubmitButton.disabled = false;

}
function submitAnswer() {
    const radioButtons = document.querySelectorAll('input[name="choice"]');
    let selectedAnswer;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedAnswer = radioButton.dataset.number;
            break;
        }
    }
    while (!selectedAnswer) {
        alert('Please choose an option!')
        return;
    }
    if (selectedAnswer === quizCollection[index]?.correctAnswer) {
        currentScore += 20;
        resultDisplay.innerHTML = "Correct!"
    } else {
        resultDisplay.innerHTML = "Incorrect!"
        timeCount -= 10;
    }
    radioButtons.forEach(item => item.disabled = true);
    answerSubmitButton.disabled = true;
}
function showDonePage() {
    quizPage.setAttribute("class", "inactive");
    donePage.setAttribute("class", "active");
    highScorePage.setAttribute("class", "inactive");
    startPage.setAttribute("class", "inactive");
    highScorePage.setAttribute("class", "inactive");
    currentScoreSpan.textContent = currentScore;
}
function submitInitial() {
    if (initialsInput.value === "") {
        alert("Please enter a initial")
        return;
    } else {
        currentInitial = initialsInput.value;
        const highScoreList = JSON.parse(localStorage.getItem("initials")) || [];
        highScoreList.push({ initial: currentInitial, score: currentScore })
        localStorage.setItem("initials", JSON.stringify(highScoreList))
        showScorePage();
    }
}
function showScorePage() {
    highScorePage.setAttribute("class", "active");
    startPage.setAttribute("class", "inactive");
    header.setAttribute("class", "inactive");
    quizPage.setAttribute("class", "inactive")
    donePage.setAttribute("class", "inactive");
    var prevInitials = JSON.parse(localStorage.getItem("initials"))?.sort((a, b) => b.score - a.score);
    prevInitials?.forEach((item, index) => {
        const initialsDiv = document.createElement('div');
        initialsDiv.setAttribute("class", "highScoresDisplay");
        initialsDiv.innerHTML = `${index + 1}. ${item.initial} : ${item.score}`;
        highScoresContainer.appendChild(initialsDiv);
    })
}

function clearFunction() {
    localStorage.clear();
    while (highScoresContainer.firstChild) {
        highScoresContainer.removeChild(highScoresContainer.firstChild);
    }
}

