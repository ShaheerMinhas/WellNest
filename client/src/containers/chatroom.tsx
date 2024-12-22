import { useState } from 'react';
import logo from '../assets/wellnest-logo.svg';

interface ChatProps {
  questions: string[];
}

const Chat: React.FC<ChatProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const answer = inputValue.trim();

    // Check if the answer is a number between 0 and 3 (inclusive)
    if (/^[0-3]$/.test(answer)) {
      setAnswers([...answers, answer]);
      setInputValue('');
      setErrorMessage(null); // Clear error message on valid input

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setIsComplete(true);
      }
    } else {
      setErrorMessage("Wrong format! Please enter a number between 0 and 3.");
    }
  };

  const messages = questions.slice(0, currentQuestion + 1).map((question, index) => ({
    type: 'bot',
    content: question
  })).flatMap((item, index) => {
    if (answers[index]) {
      return [item, { type: 'user', content: answers[index] }];
    }
    return [item];
  });

  // Calculate the BDI score by summing the values of answers (0-3 scale)
  const totalScore = answers.reduce((sum, answer) => sum + parseInt(answer), 0);

  // BDI interpretation
  let interpretation = '';
  if (totalScore <= 10) {
    interpretation = 'Not Depression';
  } else if (totalScore <= 16) {
    interpretation = 'Mild Mood Disturbance';
  } else if (totalScore <= 20) {
    interpretation = 'Borderline Clinical';
  } else if (totalScore <= 30) {
    interpretation = 'Moderate';
  } else if (totalScore <= 40) {
    interpretation = 'Severe';
  } else {
    interpretation = 'Extreme';
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col-reverse p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <img src={logo} alt="Logo" className="w-8 h-8 group-hover:-rotate-180 transition-rotate duration-500" />
              )}
              <div
                className={`rounded-2xl p-4 max-w-[80%] ${message.type === 'user' ? 'bg-white border' : 'bg-transparent'}`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {errorMessage && (
            <div className="flex justify-start">
              <div className="rounded-lg p-4 max-w-[80%] bg-red-200">
                {errorMessage}
              </div>
            </div>
          )}
          {isComplete && (
            <div className="flex justify-start">
              <div className="rounded-lg p-4 max-w-[80%] bg-transparent">
                <div>Thank you for answering all the questions!</div>
                <div>Your total score is: {totalScore}</div>
                <div>Interpretation: {interpretation}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Field */}
      {!isComplete && (
        <form onSubmit={handleSubmit} className="flex gap-2 bg-white mb-6">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your answer (0 to 3)..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
          />

          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}


export default Chat;