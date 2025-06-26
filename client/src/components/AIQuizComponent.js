
import React, { useState } from "react";

const questions = [
  {
    question: "What is articulation therapy?",
    options: ["Teaching language rules", "Improving speech sound production", "Enhancing memory", "Grammar exercises"],
    answer: "Improving speech sound production",
  },
  {
    question: "Which tool is used to analyze swallowing disorders?",
    options: ["Whisper", "MBS", "EEG", "MRI"],
    answer: "MBS",
  },
];

const AIQuizComponent = () => {
  const [selected, setSelected] = useState({});
  const [score, setScore] = useState(null);

  const handleSelect = (qIndex, option) => {
    setSelected({ ...selected, [qIndex]: option });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.answer) correct++;
    });
    setScore(`${correct} / ${questions.length}`);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>🧠 AI Knowledge Quiz</h3>
      {questions.map((q, i) => (
        <div key={i}>
          <p><strong>{q.question}</strong></p>
          {q.options.map((opt) => (
            <label key={opt} style={{ display: "block" }}>
              <input
                type="radio"
                name={`q-${i}`}
                value={opt}
                checked={selected[i] === opt}
                onChange={() => handleSelect(i, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
        Submit Answers
      </button>
      {score && <p><strong>Score:</strong> {score}</p>}
    </div>
  );
};

export default AIQuizComponent;
