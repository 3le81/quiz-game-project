function start_game() {
    let x = document.getElementById("start_button");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
};

function hide_off() {
    document.getElementById("form_questions").style.visibility = "visible";

}

(function () {
    function buildQuiz() {
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for (letter in currentQuestion.answers) {

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'limegreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

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
            question: "When the WW2 ended?",
            answers: {
                a: "1947",
                b: "1944",
                c: "1945"
            },
            correctAnswer: "c"
        },
        {
            question: "Which two birds are the topic of a discussion in Shakespeare's Romeo and Juliet?",
            answers: {
                a: "Skylark and nightingale",
                b: "Robin and dove",
                c: "Skylark and robin"
            },
            correctAnswer: "a"
        }
    ];

    // Kick things off
    buildQuiz();

    // Event listeners
    submitButton.addEventListener('click', showResults);

})();
function check_score() {
    alert("Checking your score...");
}