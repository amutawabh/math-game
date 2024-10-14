/*-------------- Constants -------------*/
const questions = [
    { question: "4 + 0 =", options: [4, 0, 2, 6], answer: 4 },
    { question: "2 - 2 =", options: [0, -2, 2, 4], answer: 0 },
    { question: "3 - 6 =", options: [-3, 3, 0, 6], answer: -3 },
    { question: "4 + 2 =", options: [6, 4, 2, 0], answer: 6 },
    { question: "4 + 6 =", options: [10, 8, 4, 12], answer: 10 },
];

/*---------- Variables (state) ---------*/
let currentQuestionIndex = 0; 
let score = 0; 
let userAnswers = [];

/*----- Cached Element References  -----*/
const questionElement = document.getElementById("question"); 
const optionsElement = document.getElementById("options"); 
const resultElement = document.getElementById("result"); 
const submitButton = document.getElementById("submit"); 

/*-------------- Functions -------------*/
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex]; 
    questionElement.innerText = currentQuestion.question; 
    optionsElement.innerHTML = ""; 
    currentQuestion.options.forEach((option, index) => {
        optionsElement.innerHTML += `
            <div class="option">
                <input type="radio" name="option" id="option${index}" value="${option}">
                <label for="option${index}">${option}</label>
            </div>
        `;
    });
}

function showResult() {
    let resultHTML = `<h3>Your result: ${score} of ${questions.length}</h3><br>`;
    resultHTML += "<h3>Answer details:</h3>";


    if (score >= 3) {
        resultHTML += '<span style="color: green; font-size: 24px;">Great Job!</span><br><br>';
    } else {
        resultHTML += '<span style="color: red; font-size: 24px;">Game Over, Please Try Again</span><br><br>';
    }

    questions.forEach((question, index) => {
        resultHTML += `<p>${index + 1}. ${question.question} <br>`;

        if (userAnswers[index] === question.answer) {
            resultHTML += `Your Answer : <span style="color: green;">${userAnswers[index]}</span> <br>`;
        } else {
            resultHTML += `Your Answer: <span style="color: red;">${userAnswers[index] !== undefined ? userAnswers[index] : "Not answered"}</span> <br>`;
        }

        resultHTML += `The Right Answer: <span style="color: blue;">${question.answer}</span></p><hr>`;
    });

    resultElement.innerHTML = resultHTML; 
    resultElement.style.display = "block"; 
    questionElement.style.display = "none"; 
    optionsElement.style.display = "none"; 
    submitButton.style.display = "none";


  
        resultElement.innerHTML += '<button id="restart">Restart Game</button>';
        document.getElementById("restart").addEventListener("click", restartGame);
    
}

function restartGame() {
    currentQuestionIndex = 0; 
    score = 0; 
    userAnswers = []; 
    resultElement.style.display = "none"; 
    questionElement.style.display = "block"; 
    optionsElement.style.display = "block"; 
    submitButton.style.display = "inline"; 
    loadQuestion(); 
}

/*----------- Event Listeners ----------*/
submitButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="option"]:checked'); 
    if (!selectedOption) return alert("Please choose an answer!"); 

    const answer = parseInt(selectedOption.value); 
    userAnswers[currentQuestionIndex] = answer; 

    if (answer === questions[currentQuestionIndex].answer) { 
        score++; 
    }

    currentQuestionIndex++; 
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); 
    } else {
        showResult(); 
    }
});

loadQuestion();