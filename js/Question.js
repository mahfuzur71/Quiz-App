export default function Question(questions, choices, answer) {
  this.questions = questions;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrect = function (choices) {
  return this.answer === choices;
};
