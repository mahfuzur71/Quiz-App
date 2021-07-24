import Quiz from "./Quiz.js";
import Question from "./Question.js";

const App = (() => {
  // Catch the DOM
  const quizEl = document.querySelector(".quiz");
  const quizQue = document.querySelector(".quiz__question");
  const quizTracker = document.querySelector(".quiz__tracker");
  const quizTagline = document.querySelector(".quiz__tagline");
  const choices = document.querySelector(".quiz__choices");
  const progress = document.querySelector(".progress__inner");
  const next = document.querySelector(".next");
  const restart = document.querySelector(".restart");

  // Quiz Questions

  const q1 = new Question(
    "What is the victory day of Bangladesh?",
    [
      "16 December,1971",
      "15 December,1971",
      "14 December,1971",
      "13 December,1971",
    ],
    0
  );

  const q2 = new Question(
    "what is the international mother language day?",
    ["20 February", "21 February", "23 February", "24 February"],
    1
  );

  const q3 = new Question(
    "What is the number of Districs in Bangladesh",
    ["66", "63", "65", "64"],
    3
  );
  const q4 = new Question(
    "what is the capital city of bangladesh",
    ["Noakhali", "Rajshahi", "Khulna", "Dhaka"],
    3
  );
  const q5 = new Question(
    "what is the currency of bangladesh",
    ["Dollar", "Bangladeshi taka", "African rand", "Rupee"],
    1
  );

  const quiz = new Quiz([q1, q2, q3, q4, q5]);

  const listener = () => {
    next.addEventListener("click", function () {
      const currentIndexElement = document.querySelector(
        'input[name="choice"]:checked'
      );
      if (currentIndexElement) {
        const key = Number(currentIndexElement.getAttribute("data-order"));
        quiz.increaseScore(key);
        renderAll();
      }
    });

    restart.addEventListener("click", function () {
      quiz.reset();
      renderAll();
      next.style.display = "block";
      choices.style.display = "flex";
    });
  };

  const renderQues = () => {
    const currQues = quiz.getcurrentquestion().questions;
    quizQue.innerText = currQues;
  };

  const renderChoiceElement = () => {
    const currChoice = quiz.getcurrentquestion().choices;
    let markup = "";
    currChoice.forEach((element, index) => {
      markup += `
            <li class="quiz__choice">
                <input type="radio" name="choice" class="quiz__input" id="${index}" data-order="${index}" />
                <label for="${index}" class="quiz__label">
                <i></i>
                <span>${element}</span>
                </label>
            </li>`;
    });
    choices.innerHTML = markup;
  };

  const renderTracker = () => {
    const index = quiz.currentIndex;
    quizTracker.innerHTML = `${index + 1} of ${quiz.questions.length}`;
  };

  const renderProgress = () => {
    const currentWidth = Math.round(
      (quiz.currentIndex / quiz.questions.length) * 100
    );
    progress.style.width = `${currentWidth}%`;
  };

  const renderEndScreen = () => {
    quizQue.innerText = "Congratulations !";
    quizTagline.innerText = "Quiz Ended";
    quizTracker.innerText = "Your Score is: " + quiz.score;
    next.style.display = "none";
    choices.style.display = "none";
    renderProgress();
  };

  const renderAll = () => {
    if (quiz.hasEnded()) {
      //render end screen
      renderEndScreen();
    } else {
      // render question
      renderQues();
      // render choises
      renderChoiceElement();

      // render quiz tracker
      renderTracker();
      // render progress bar
      renderProgress();
    }
  };

  return {
    renderAll: renderAll,
    listener: listener,
  };
})();

App.renderAll();
App.listener();
