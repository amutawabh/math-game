/*-------------- Constants -------------*/
const questions = [
    { question: "4 + 0 =", options: [4, 0, 2, 6], answer: 4 },
    { question: "2 - 2 =", options: [0, -2, 2, 4], answer: 0 },
    { question: "3 - 6 =", options: [-3, 3, 0, 6], answer: -3 },
    { question: "4 + 2 =", options: [6, 4, 2, 0], answer: 6 },
    { question: "4 + 6 =", options: [10, 8, 4, 12], answer: 10 },
];

/*---------- Variables (state) ---------*/
let currentQuestionIndex = 0; // مؤشر السؤال الحالي
let score = 0; // النقاط الحالية
let userAnswers = []; // مصفوفة لتخزين إجابات المستخدم

/*----- Cached Element References  -----*/
const questionElement = document.getElementById("question"); // عنصر السؤال
const optionsElement = document.getElementById("options"); // عنصر خيارات الإجابة
const resultElement = document.getElementById("result"); // عنصر عرض النتيجة
const submitButton = document.getElementById("submit"); // زر التقديم

/*-------------- Functions -------------*/
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex]; // الحصول على السؤال الحالي
    questionElement.innerText = currentQuestion.question; // عرض نص السؤال
    optionsElement.innerHTML = ""; // إعادة تعيين خيارات الإجابة
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
    // إعداد نص النتيجة
    let resultHTML = `Your result: ${score} of ${questions.length}<br><br>`;
    resultHTML += "<h3>Answer details:</h3>";
    
    questions.forEach((question, index) => {
        resultHTML += `<p>${index + 1}. ${question.question} <br>`;
        
        // التحقق إذا كانت الإجابة صحيحة أو خاطئة
        if (userAnswers[index] === question.answer) {
            resultHTML += `Your Answer : <span style="color: green;">${userAnswers[index]}</span> <br>`;
        } else {
            resultHTML += `Your Answer: <span style="color: red;">${userAnswers[index] !== undefined ? userAnswers[index] : "لم يتم الإجابة"}</span> <br>`;
        }
        
        resultHTML += `The Right Answer: <span style="color: blue;">${question.answer}</span></p><hr>`;
    });

    resultElement.innerHTML = resultHTML; // عرض النتائج
    resultElement.style.display = "block"; // إظهار العنصر
    questionElement.style.display = "none"; // إخفاء السؤال
    optionsElement.style.display = "none"; // إخفاء الخيارات
    submitButton.style.display = "none"; // إخفاء الزر
}

/*----------- Event Listeners ----------*/
submitButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="option"]:checked'); // الحصول على الخيار المحدد
    if (!selectedOption) return alert("يرجى اختيار إجابة!"); // التحقق من تحديد خيار

    const answer = parseInt(selectedOption.value); // تحويل القيمة إلى عدد صحيح
    userAnswers[currentQuestionIndex] = answer; // تخزين الإجابة في المصفوفة

    if (answer === questions[currentQuestionIndex].answer) { // التحقق من الإجابة الصحيحة
        score++; // زيادة النقاط في حال كانت الإجابة صحيحة
    }

    currentQuestionIndex++; // الانتقال إلى السؤال التالي
    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // تحميل السؤال التالي
    } else {
        showResult(); // عرض النتيجة النهائية
    }
});

// Load the first question
loadQuestion(); // تحميل السؤال الأول عند بدء اللعبة