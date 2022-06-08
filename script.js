//get the element from html
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

//declare the time for completing the assessment
var timeCount;
//initialize a score
var currentScore = 0;
//initialize the initials
var currentInitial = "";
//declare the index of the quizCollection
var index = 0;
//create a object to store the question, we can add more or delete one of them
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

//add click event to the startButton
startButton.addEventListener("click", startQuizAssessment);
//add click event to the view score
viewScore.addEventListener("click", showScorePage);
//add click event to the back button
backButton.addEventListener("click", showStartPage);
//add click event to the next button
nextButton.addEventListener("click", replacePage);
//add click event to the submit initials button
initialsSubmitButton.addEventListener("click", submitInitial)
//add click event to the submit answer button
answerSubmitButton.addEventListener("click", submitAnswer)
//add click event to the clear score button
clearScoresButton.addEventListener("click", clearFunction)

//click startButton or backButton will trigger showStartPage function
function showStartPage() {
    //set startPage active other pages inactive
    startPage.setAttribute("class", "active");
    header.setAttribute("class", "active");
    highScorePage.setAttribute("class", "inactive");
    quizPage.setAttribute("class", "inactive")
    donePage.setAttribute("class", "inactive");
    //set the index to 0 
    index = 0;
    //show 0 of the time counter to the screen
    timeCounter.innerHTML = 0;
    //set currentScore to 0 every time we call this function
    currentScore = 0;
    //clear time every time we call this function
    clearInterval(timer);
    //clear quiz cache every time we call this function
    while (quizPageContainer.hasChildNodes()) {
        quizPageContainer.removeChild(quizPageContainer.firstChild);
    }
    //clear score cache every time we call this function
    while (highScoresContainer.firstChild) {
        highScoresContainer.removeChild(highScoresContainer.firstChild);
    }
    //clear initialsInput every time we call this function
    initialsInput.value = ''
}

//use setInterval to set a timer
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
    //call this function to show the quiz page
    showQuizPage()
}

function showQuizPage() {
    startPage.setAttribute("class", "inactive");
    quizPage.setAttribute("class", "active");
    //show the first quiz page
    addFirstQuiz();
}
function addFirstQuiz() {
    //create the question and show on the screen
    const questionElement = document.createElement('h1')
    questionElement.setAttribute("class", "quizPageQuestion")
    questionElement.innerHTML = `${quizCollection[index].question}`
    quizPageContainer.appendChild(questionElement);
    //create the answer element and show on the screen
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
    //set the resultDisplay is empty
    resultDisplay.innerHTML = '';
    // setup the answer submit button
    answerSubmitButton.disabled = false;
}
//click next button will trigger replacePage function
function replacePage() {
    //should submit answer first
    while (!resultDisplay.innerHTML) {
        alert('Please submit an option!')
        return;
    }
    //add index to show next question
    index++;
    //judge if it run out time or finish all the questions
    if (index === quizCollection.length) {
        showDonePage();
        clearInterval(timer)
        timeCounter.innerHTML = timeCount;
    }
    //replace previous question and answers
    const prevQuestion = quizPageContainer.children[0];
    const questionElement = document.createElement('h1')
    questionElement.setAttribute("class", "quizPageQuestion")
    //use ? to prevent error if the quizCollection[index] is null
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
//click submit answer button will trigger replacePage function
function submitAnswer() {
    //get which answer has been selected
    const radioButtons = document.querySelectorAll('input[name="choice"]');
    let selectedAnswer;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedAnswer = radioButton.dataset.number;
            break;
        }
    }
    //need to select answer before click submit button
    while (!selectedAnswer) {
        alert('Please choose an option!')
        return;
    }
    //judge answers
    if (selectedAnswer === quizCollection[index]?.correctAnswer) {
        currentScore += 20;
        resultDisplay.innerHTML = "Correct!"
    } else {
        resultDisplay.innerHTML = "Incorrect!"
        timeCount -= 10;
    }
    //make the radioButtons disabled once submit
    radioButtons.forEach(item => item.disabled = true);
    answerSubmitButton.disabled = true;
}
//show the donePage once finish quiz or run out of time
function showDonePage() {
    quizPage.setAttribute("class", "inactive");
    donePage.setAttribute("class", "active");
    highScorePage.setAttribute("class", "inactive");
    startPage.setAttribute("class", "inactive");
    highScorePage.setAttribute("class", "inactive");
    //show the score
    currentScoreSpan.textContent = currentScore;
}
//submit initials function
function submitInitial() {
    if (initialsInput.value === "") {
        alert("Please enter a initial")
        return;
    } else {
        //store the initials input with the score
        currentInitial = initialsInput.value;
        const highScoreList = JSON.parse(localStorage.getItem("initials")) || [];
        highScoreList.push({ initial: currentInitial, score: currentScore })
        localStorage.setItem("initials", JSON.stringify(highScoreList))
        showScorePage();
    }
}
//showScorePage
function showScorePage() {
    highScorePage.setAttribute("class", "active");
    startPage.setAttribute("class", "inactive");
    header.setAttribute("class", "inactive");
    quizPage.setAttribute("class", "inactive")
    donePage.setAttribute("class", "inactive");
    //get the score and initials and will be sorted by score
    var prevInitials = JSON.parse(localStorage.getItem("initials"))?.sort((a, b) => b.score - a.score);
    //loop through the the prevInitials to show the scores and initials
    prevInitials?.forEach((item, index) => {
        const initialsDiv = document.createElement('div');
        initialsDiv.setAttribute("class", "highScoresDisplay");
        initialsDiv.innerHTML = `${index + 1}. ${item.initial} : ${item.score}`;
        highScoresContainer.appendChild(initialsDiv);
    })
}
//click clear button will trigger clearFunction function
function clearFunction() {
    localStorage.clear();
    while (highScoresContainer.firstChild) {
        highScoresContainer.removeChild(highScoresContainer.firstChild);
    }
}

