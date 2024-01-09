// Update the clock with the current UK time
function updateClock() {
    const clockElement = document.getElementById("clock");
    const options = { timeZone: "Europe/London", weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
    const ukTime = new Date().toLocaleString("en-GB", options);
    clockElement.textContent = ukTime;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Function to toggle the visibility of the start button
function start_game() {
    let startButton = document.getElementById("start_button");
    startButton.style.display = (startButton.style.display === "none") ? "block" : "none";
}

// Function to show the form questions
function hide_off() {
    document.getElementById("form_questions").style.visibility = "visible";
}

// Quiz logic
(function () {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    const myQuestions = [
        {
            question: "1. Where can you see the Colosseum?",
            answers: {
                a: "Paris",
                b: "Berlin",
                c: "Rome"
            },
            correctAnswer: "c"
        },
        {
            question: "2. When did WW2 end?",
            answers: {
                a: "1947",
                b: "1944",
                c: "1945"
            },
            correctAnswer: "c"
        },
        {
            question: "3. Which two birds are the topic of discussion in Shakespeare's Romeo and Juliet?",
            answers: {
                a: "Skylark and nightingale",
                b: "Robin and dove",
                c: "Skylark and robin"
            },
            correctAnswer: "a"
        },
        {
            question: "4. Which planet is the closest to the Sun?",
            answers: {
                a: "Mars",
                b: "Mercury",
                c: "Earth"
            },
            correctAnswer: "b"
        },
        {
            question: "5. What is the most spoken language in the world?",
            answers: {
                a: "English",
                b: "Chinese",
                c: "Spanish"
            },
            correctAnswer: "b"
        }
    ];

    function buildQuiz() {
        const output = [];

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </label>`
                );
            }

            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        });

        quizContainer.innerHTML = output.join(' ');

        // Apply styles to questions and answers
        const questionElements = document.querySelectorAll('.question');
        const answerElements = document.querySelectorAll('.answers label');

        questionElements.forEach(questionElement => {
            questionElement.style.fontWeight = 'bold';
            questionElement.style.fontSize = '1.5rem';
            questionElement.style.marginTop = '15px';
            questionElement.style.marginBottom = '10px';
        });

        answerElements.forEach(answerElement => {
            answerElement.style.fontSize = '1rem';
            answerElement.style.marginBottom = '10px';
            answerElement.style.display = 'block';  // Ensures each answer is on a new line
        });
    }

    function showResults() {
        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = quizContainer.querySelector(`.answers:nth-child(${questionNumber * 2 + 2})`);
            const questionContainer = quizContainer.querySelector(`.question:nth-child(${questionNumber * 2 + 1})`);
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                questionContainer.style.color = 'limegreen';
            } else {
                questionContainer.style.color = 'red';
            }
        });

        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        start_again_button();
    }


    buildQuiz();

    submitButton.addEventListener('click', showResults);
})();

// Function to show the start again button
function start_again_button() {
    document.getElementById("start_again_btn").style.visibility = "visible";
}
