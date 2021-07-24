import Question from "./Question.js";

export default function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.currentIndex = 0;
}

Quiz.prototype.getcurrentquestion = function () {
  return this.questions[this.currentIndex];
};

Quiz.prototype.nextIndex = function () {
  this.currentIndex++;
};

Quiz.prototype.hasEnded = function () {
  return this.currentIndex == this.questions.length;
};

Quiz.prototype.increaseScore = function (userguess) {
  const currque = this.getcurrentquestion();
  if (currque.isCorrect(userguess)) {
    this.score++;
  }
  this.nextIndex();
};

Quiz.prototype.reset = function () {
  this.score = 0;
  this.currentIndex = 0;
};
