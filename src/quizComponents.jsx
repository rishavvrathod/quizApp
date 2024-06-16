import React, { useState, useEffect } from 'react';

const QuizComponent = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const savedQuestion = localStorage.getItem('currentQuestion');
    const savedTime = localStorage.getItem('timeLeft');
    if (savedQuestion) setCurrentQuestion(parseInt(savedQuestion));
    if (savedTime) setTimeLeft(parseInt(savedTime));

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) clearInterval(interval);
        localStorage.setItem('timeLeft', prevTime - 1);
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentQuestion', currentQuestion);
  }, [currentQuestion]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  if (timeLeft <= 0) {
    return <div>Time's up! The quiz has ended.</div>;
  }

  return (
    <div>
      <div>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
      <div>{questions[currentQuestion].question}</div>
      {questions[currentQuestion].options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            value={option}
            checked={selectedOption === option}
            onChange={() => handleOptionChange(option)}
          />
          {option}
        </div>
      ))}
      <button onClick={handleNextQuestion}>Next</button>
    </div>
  );
};

export default QuizComponent;
