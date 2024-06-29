import React, { useState } from 'react';
import './soal1.css';




const generateRandomFraction = () => {
  const numerator = Math.floor(Math.random() * 9) + 1;
  const denominator = Math.floor(Math.random() * 9) + 1;
  return { numerator, denominator };
};

const fractionsToString = (frac) => `${frac.numerator}/${frac.denominator}`;

const operations = [
  (a, b) => ({ numerator: a.numerator * b.denominator + b.numerator * a.denominator, denominator: a.denominator * b.denominator }), // Penjumlahan
  (a, b) => ({ numerator: a.numerator * b.denominator - b.numerator * a.denominator, denominator: a.denominator * b.denominator }), // Pengurangan
  (a, b) => ({ numerator: a.numerator * b.numerator, denominator: a.denominator * b.denominator }), // Perkalian
];

const generateQuestion = (numFractions) => {
  const opIndex = Math.floor(Math.random() * operations.length);
  const fractions = Array.from({ length: numFractions }, generateRandomFraction);
  const result = fractions.slice(1).reduce((acc, frac) => operations[opIndex](acc, frac), fractions[0]);

  const correctAnswer = fractionsToString(result);
  const wrongAnswers = [
    fractionsToString(generateRandomFraction()),
    fractionsToString(generateRandomFraction()),
    fractionsToString(generateRandomFraction())
  ];

  const answers = [correctAnswer, ...wrongAnswers].sort(() => 0.5 - Math.random());

  return {
    question: `Berapa hasil dari ${fractions.map(fractionsToString).join(` ${['+', '-', 'x'][opIndex]} `)}?`,
    answers,
    correctAnswer
  };
};

const generateQuestions = (numQuestions = 10) => {
  return Array.from({ length: numQuestions }, (_, i) => generateQuestion(i % 2 === 0 ? 2 : 3));
};

const Soal1 = () => {
  const [questions, setQuestions] = useState(generateQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  const handleReset = () => {
    setQuestions(generateQuestions());
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer("");
  };

  const handleScore = () => {
    alert(`Score: ${score * 10}`);
  };

  return (
    <div className="soal-container">
      <div className="question-box">
        <h2>Soal {currentQuestionIndex + 1}</h2>
        <p>{questions[currentQuestionIndex].question}</p>
        {questions[currentQuestionIndex].answers.map((answer, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              {answer}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleCheckAnswer}>Soal Baru</button>
      <button onClick={handleScore}>Score</button>
      <button onClick={handleReset}>Acak</button>
    </div>
  );
};

export default Soal1;
