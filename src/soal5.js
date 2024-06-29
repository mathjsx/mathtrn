import React, { useState } from 'react';

const generateRandomLogarithmQuestion = () => {
  const base1 = Math.floor(Math.random() * 9) + 2; // Base between 2 and 10
  const value1 = Math.floor(Math.random() * 9) + 2; // Value between 2 and 10
  const base2 = Math.floor(Math.random() * 9) + 2;
  const value2 = Math.floor(Math.random() * 9) + 2;
  const operation = Math.random() > 0.5 ? '*' : '/'; // Randomly choose between multiplication and division

  let question, correctAnswer;

  if (operation === '*') {
    question = `log_${base1}(${value1}) * log_${base2}(${value2})`;
    correctAnswer = `log_${base1 * base2}(${value1 * value2})`;
  } else {
    question = `log_${base1}(${value1}) / log_${base2}(${value2})`;
    correctAnswer = `log_${base1 / base2}(${value1 / value2})`;
  }

  const options = new Set();
  options.add(correctAnswer);

  while (options.size < 4) {
    const wrongBase = Math.floor(Math.random() * 18) - 9; // Range -9 to 9
    const wrongValue = Math.floor(Math.random() * 18) - 9; // Range -9 to 9
    options.add(`log_${wrongBase}(${wrongValue})`);
  }

  return {
    question,
    options: Array.from(options),
    correctAnswer,
  };
};

const Soal5 = () => {
  const [questions, setQuestions] = useState(Array.from({ length: 10 }, generateRandomLogarithmQuestion));
  const [score, setScore] = useState(0);

  const handleNewQuestions = () => {
    setQuestions(Array.from({ length: 10 }, generateRandomLogarithmQuestion));
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
          <p>{index + 1}. <math xmlns="http://www.w3.org/1998/Math/MathML">
              <mrow>
                <msub>
                  <mi>log</mi>
                  <mi>{q.question.split('_')[1][0]}</mi>
                </msub>
                <mo>(</mo>
                <mi>{q.question.split('(')[1].split(')')[0]}</mi>
                <mo>)</mo>
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
              <label>
                <math xmlns="http://www.w3.org/1998/Math/MathML">
                  <mrow>
                    <msub>
                      <mi>log</mi>
                      <mi>{option.split('_')[1][0]}</mi>
                    </msub>
                    <mo>(</mo>
                    <mi>{option.split('(')[1].split(')')[0]}</mi>
                    <mo>)</mo>
                  </mrow>
                </math>
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleNewQuestions}>Acak</button>
      <button onClick={handleScore}>Score</button>
    </div>
  );
};

export default Soal5;
