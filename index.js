/* global $, STORE */

let questionNumber = 0;
let score = 0;

/* generate question html
This function will generate the question and answer options and then render the results */
function generateQuestion () {
    if (questionNumber < STORE.length) {
        return `<div class="question-${questionNumber}">
      <h3>${STORE[questionNumber].question}</h3>
      <form>
      <fieldset>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
      <span>${STORE[questionNumber].answers[0]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
      <span>${STORE[questionNumber].answers[1]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
      <span>${STORE[questionNumber].answers[2]}</span>
      </label>
      <label class="answerOption">
      <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
      <span>${STORE[questionNumber].answers[3]}</span>
      </label>
      <button type="submit" class="submitButton">Submit</button>
      </fieldset>
      </form>
      </div>`;
    } else {
        renderResults();
        restartQuiz();
        $('.questionNumber').text(10)
    }
}

function changeQuestionNumber() {
    questionNumber ++;
    $('.questionNumber').text(questionNumber+1);
}

function changeScore() {
    score ++;
}
// This function will start the quiz when the begin button is pressed and show the first question 
function startQuiz () {
    $('.quizStart').on('click', '.startButton', function(event) {
        $('.quizStart').remove();
        $('.questionAnswerForm').css('display', 'block');
        $('.questionNumber').text(1);
    });
}

// This function will render the question in the DOM 
function renderQuestion() {
    $('.questionAnswerForm').html(generateQuestion());
}

// This function produce a feedback response of correct or incorrect when an answer is submitted.
function userSelectAnswer () {
    $('form').on('submit', function(event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (answer === correctAnswer) {
            selected.parent().addClass('correct');
            ifAnswerIsCorrect();
        } else {
            selected.parent().addClass('wrong');
            ifAnswerIsWrong();
        }
    });
}
function ifAnswerIsCorrect() {
    userAnswerFeedbackCorrect();
    updateScore();
}
function ifAnswerIsWrong() {
    userAnswerFeedbackWrong();
}

//These functions will update the score based on if an answer was answered correctly or incorrectly
function userAnswerFeedbackCorrect() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="correctFeedback">
    <div class="image"><img src="${STORE[questionNumber].image}" alt="${STORE[questionNumber].alt}"/></div>
    <p>Brilliant! 10 Points to Gryffindor!</p>
    <button type="button" class="nextButton">Next Question</button></div>`);
}

function userAnswerFeedbackWrong() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="correctFeedback">
    <div class="image"><img src="${STORE[questionNumber].image}" alt="${STORE[questionNumber].alt}"/></div>
    <p>Blast! The correct answer is <span>"${correctAnswer}"</span>... How will you ever pass your O.W.L.'s?</p>
    <button type="button" class="nextButton">Next Question</button></div>`);

}

function updateScore() {
    changeScore();
    $('.score').text(score);
}

// This function renders results and displays html for the final page of the quiz
function renderResults() {
    if (score >= 8) {
        $('.questionAnswerForm').html(`<div class="results correctFeedback">
        <h3>Brilliant Performance! You must be a real wizard!</h3>
        <img src="" alt=""/>
        <p>You got ${score} / 10</p> 
        <button class="restartButton">Try Quiz Again</button></div>`);
    } else if (score < 8 && score >= 5) {
        $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Brush up a little and you could be headed to Hogwarts!</h3>
        <img src="" alt=""/>
        <p>You got ${score} / 10</p>
        <button class="restartButton">Try Quiz Again</button></div>`);
    } else {
        $('.questionAnswerForm').html(`<div class="results correctFeedback"
        <h3>You got ${score} / 10</h3>
        <p>Ah, you  must be a muggle. Keep studying!</p>
        <img src="" alt=""/>
        <button class="restartButton">Try Quiz Again</button></div>`);
    }
}

// This function brings the user to the next question when they press the next button
function renderNextQuestion() {
    $('main').on('click', '.nextButton', function(event) {
        changeQuestionNumber();
        renderQuestion();
        userSelectAnswer();
    });

}

// This function brings the user back to the first page of the quiz and resets the score if they click the restart quiz button
function restartQuiz() {
    $('main').on('click', '.restartButton', function(event){
        location.reload();
    });
}

// This function runs all of the main quiz functions to create the quiz
function createQuiz() {
    startQuiz();
    renderQuestion();
    userSelectAnswer();
    renderNextQuestion();
}

$(createQuiz);