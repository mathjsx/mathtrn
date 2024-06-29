import React, { useState } from 'react';
import './soal.css';

const generateRandomFraction = () => {
  const numerator = Math.floor(Math.random() * 9) + 1;
  const denominator = Math.floor(Math.random() * 9) + 1;
  return `${numerator}/${denominator}`;
};

const addFractions = (frac1, frac2) => {
  const [num1, denom1] = frac1.split('/').map(Number);
  const [num2, denom2] = frac2.split('/').map(Number);
  const numerator = num1 * denom2 + num2 * denom1;
  const denominator = denom1 * denom2;
  return `${numerator}/${denominator}`;
};

const multiplyFractions = (frac1, frac2) => {
  const [num1, denom1] = frac1.split('/').map(Number);
  const [num2, denom2] = frac2.split('/').map(Number);
  const numerator = num1 * num2;
  const denominator = denom1 * denom2;
  return `${numerator}/${denominator}`;
};

const simplifyFraction = (fraction) => {
  const [numerator, denominator] = fraction.split('/').map(Number);
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const commonDivisor = gcd(numerator, denominator);
  return `${numerator / commonDivisor}/${denominator / commonDivisor}`;
};

const generateQuestion = () => {
  const fraction1 = generateRandomFraction();
  const fraction2 = generateRandomFraction();
  const isAddition = Math.random() > 0.5;
  const questionText = isAddition
    ? `${fraction1} + ${fraction2}`
    : `${fraction1} * ${fraction2}`;
  const correctAnswer = isAddition
    ? simplifyFraction(addFractions(fraction1, fraction2))
    : simplifyFraction(multiplyFractions(fraction1, fraction2));

  const options = [];
  const correctIndex = Math.floor(Math.random() * 4);
  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) {
      options.push(correctAnswer);
    } else {
      const randomFraction = generateRandomFraction();
      options.push(randomFraction === correctAnswer ? generateRandomFraction() : randomFraction);
    }
  }

  return {
    questionText,
    options,
    correctAnswer
  };
};

const Soal = () => {
  const [questions, setQuestions] = useState(Array.from({ length: 5 }, generateQuestion));
  const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(null));
  const [score, setScore] = useState(null);

  const handleOptionChange = (questionIndex, option) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = option;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleRandomize = () => {
    setQuestions(Array.from({ length: 5 }, generateQuestion));
    setSelectedAnswers(Array(5).fill(null));
    setScore(null);
  };

  const handleScore = () => {
    const correctCount = questions.reduce((count, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return count + 1;
      }
      return count;
    }, 0);
    setScore(correctCount * 10);
  };

  return (
    <div>
      <h1>Soal Matematika Pecahan</h1>
      {questions.map((question, index) => (
        <div key={index} className="question-box">
          <p>{index + 1}. {question.questionText}</p>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={selectedAnswers[index] === option}
                onChange={() => handleOptionChange(index, option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleRandomize}>Acak</button>
      <button onClick={handleScore}>Score</button>
      {score !== null && <p>Score Anda: {score}</p>}
    </div>
  );
};

export default Soal;
