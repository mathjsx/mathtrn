import React, { useState } from 'react';

// Generate a random fraction in the form of a string "a/b"
const generateFraction = () => {
  const numerator = Math.floor(Math.random() * 10) + 1;
  const denominator = Math.floor(Math.random() * 10) + 1;
  return `${numerator}/${denominator}`;
};

// Convert fraction string to decimal
const fractionToDecimal = (fraction) => {
  const [numerator, denominator] = fraction.split('/').map(Number);
  return numerator / denominator;
};

// Generate a random percentage in the form of a string "xx%"
const generatePercentage = () => {
  return `${Math.floor(Math.random() * 100) + 1}%`;
};

// Convert percentage string to decimal
const percentageToDecimal = (percentage) => {
  return parseFloat(percentage) / 100;
};

// Generate a random decimal number in the range [0.01, 9.99]
const generateDecimal = () => {
  return (Math.random() * 9.99).toFixed(2);
};

// Generate a random question
const generateRandomQuestion = () => {
  const types = ['fraction', 'percent', 'decimal'];
  const type1 = types[Math.floor(Math.random() * types.length)];
  const type2 = types[Math.floor(Math.random() * types.length)];
  const type3 = Math.random() > 0.5 ? types[Math.floor(Math.random() * types.length)] : null;

  const generateNumber = (type) => {
    switch (type) {
      case 'fraction':
        return generateFraction();
      case 'percent':
        return generatePercentage();
      case 'decimal':
        return generateDecimal();
      default:
        return '';
    }
  };

  const num1 = generateNumber(type1);
  const num2 = generateNumber(type2);
  const num3 = type3 ? generateNumber(type3) : null;

  const operation = Math.random() > 0.5 ? '*' : '+';
  let question, correctAnswer, correctAnswerValue;

  if (operation === '*') {
    if (num3) {
      question = `${num1} * ${num2} * ${num3}`;
      correctAnswerValue = fractionToDecimal(num1) * fractionToDecimal(num2) * (num3 ? fractionToDecimal(num3) : 1);
    } else {
      question = `${num1} * ${num2}`;
      correctAnswerValue = fractionToDecimal(num1) * fractionToDecimal(num2);
    }
  } else {
    if (num3) {
      question = `${num1} + ${num2} + ${num3}`;
      correctAnswerValue = fractionToDecimal(num1) + fractionToDecimal(num2) + (num3 ? fractionToDecimal(num3) : 0);
    } else {
      question = `${num1} + ${num2}`;
      correctAnswerValue = fractionToDecimal(num1) + fractionToDecimal(num2);
    }
  }

  correctAnswer = correctAnswerValue.toFixed(2);

  const options = new Set();
  options.add(correctAnswer);

  while (options.size < 4) {
    const wrongAnswer = (Math.random() * 10).toFixed(2);
    options.add(wrongAnswer);
  }

  return {
    question,
    options: Array.from(options),
    correctAnswer,
  };
};

const Soal6 = () => {
  const [questions, setQuestions] = useState(Array.from({ length: 10 }, generateRandomQuestion));
  const [score, setScore] = useState(0);

  const handleNewQuestions = () => {
    setQuestions(Array.from({ length: 10 }, generateRandomQuestion));
    setScore(0);
  };

  const handleScore = () => {
    const totalScore = score * 10;
    alert(`Your score is: ${totalScore}`);
    localStorage.setItem('score6', totalScore);
  };

  const handleAnswer = (index, answer) => {
    if (questions[index].correctAnswer === answer) {
      setScore(score + 1);
    }
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: 'blue', color: 'black' }}>
      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'lightblue' }}>
          <p>{index + 1}. <math xmlns="http://www.w3.org/1998/Math/MathML">
              <mrow>
                {q.question.split(' ').map((part, i) => (
                  <React.Fragment key={i}>
                    {isNaN(part) ? <mo>{part}</mo> : <mn>{part}</mn>}
                  </React.Fragment>
                ))}
              </mrow>
            </math>
          </p>
          {q.options.map((option, i) => (
            <div key={i}>
              <input
                type="radio"
                name={`question${index}`}
                value={option}
                onClick={() => handleAnswer(index, option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleNewQuestions}>Acak</button>
      <button onClick={handleScore}>Score</button>
    </div>
  );
};

export default Soal6;
