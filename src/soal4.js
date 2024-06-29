import React, { useState, useEffect } from 'react';
import MathJax from 'react-mathjax2';

const generateRandomSquareRootQuestion = () => {
  const base1 = Math.floor(Math.random() * 9) + 1; // Base between 1 and 9
  const base2 = Math.floor(Math.random() * 9) + 1; // Base between 1 and 9
  const operation = Math.random() > 0.5 ? '*' : '/'; // Randomly choose between multiplication and division

  let question, correctAnswer;

  if (operation === '*') {
    question = `\\sqrt{${base1}} \\times \\sqrt{${base2}}`;
    correctAnswer = `${base1 * base2}^{1/2}`;
  } else {
    question = `\\sqrt{${base1}} \\div \\sqrt{${base2}}`;
    correctAnswer = `${base1 / base2}^{1/2}`;
  }

  const options = new Set();
  options.add(correctAnswer);

  while (options.size < 4) {
    const wrongBase = Math.floor(Math.random() * 18) - 9; // Range -9 to 9
    const wrongExponent = 1/2; // Always a square root
    options.add(`${wrongBase}^{${wrongExponent}}`);
  }

  return {
    question,
    options: Array.from(options),
    correctAnswer,
  };
};

const Soal4 = () => {
  const [questions, setQuestions] = useState(Array.from({ length: 10 }, generateRandomSquareRootQuestion));
  const [score, setScore] = useState(0);

  const handleNewQuestions = () => {
    setQuestions(Array.from({ length: 10 }, generateRandomSquareRootQuestion));
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
    <MathJax.Context input='tex'>
      <div style={{ padding: '1rem', backgroundColor: 'blue', color: 'black' }}>
        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'lightblue' }}>
            <p>{index + 1}. <MathJax.Node>{q.question}</MathJax.Node></p>
            {q.options.map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name={`question${index}`}
                  value={option}
                  onClick={() => handleAnswer(index, option)}
                />
                <label><MathJax.Node>{option}</MathJax.Node></label>
              </div>
            ))}
          </div>
        ))}
        <button onClick={handleNewQuestions}>Acak</button>
        <button onClick={handleScore}>Score</button>
      </div>
    </MathJax.Context>
  );
};

export default Soal4;
