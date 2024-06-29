import React, { useState } from 'react';
import './soal3.css';
const generateRandomExponentQuestion = () => {
  const base1 = Math.floor(Math.random() * 9) + 1; // Base between 1 and 9
  const exponent1 = Math.floor(Math.random() * 9) + 1; // Exponent between 1 and 9
  const base2 = Math.floor(Math.random() * 9) + 1;
  const exponent2 = Math.floor(Math.random() * 9) + 1;
  const operation = Math.random() > 0.5 ? '*' : '/'; // Randomly choose between multiplication and division

  let question, correctAnswer;

  if (operation === '*') {
    question = `${base1}^${exponent1} * ${base2}^${exponent2}`;
    correctAnswer = `${base1 * base2}^${exponent1 + exponent2}`;
  } else {
    question = `${base1}^${exponent1} / ${base2}^${exponent2}`;
    correctAnswer = `${base1 / base2}^${exponent1 - exponent2}`;
  }

  const options = new Set();
  options.add(correctAnswer);

  while (options.size < 4) {
    const wrongBase = Math.floor(Math.random() * 18) - 9; // Range -9 to 9
    const wrongExponent = Math.floor(Math.random() * 18) - 9; // Range -9 to 9
    options.add(`${wrongBase}^${wrongExponent}`);
  }

  return {
    question,
    options: Array.from(options),
    correctAnswer,
  };
};

const Soal3 = () => {
  const [questions, setQuestions] = useState(Array.from({ length: 10 }, generateRandomExponentQuestion));
  const [score, setScore] = useState(0);

  const handleNewQuestions = () => {
    setQuestions(Array.from({ length: 10 }, generateRandomExponentQuestion));
    setScore(0);
  };

  const handleScore = () => {
    alert(`Your score is: ${score * 10}`);
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
          <p>{index + 1}. {q.question}</p>
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

export default Soal3;
