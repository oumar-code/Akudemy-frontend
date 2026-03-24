import { useEffect, useState } from 'react';

export default function DemoLesson() {
  const [lesson, setLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8084/api/lessons/1')
      .then(res => res.json())
      .then(setLesson);
  }, []);

  if (!lesson) return <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>Loading...</main>;

  const handleChange = (qIdx, optIdx) => {
    setAnswers(a => ({ ...a, [qIdx]: optIdx }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let s = 0;
    lesson.quiz.forEach((q, i) => {
      if (answers[i] === q.answer) s++;
    });
    setScore(s);
    setSubmitted(true);
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Demo Lesson: {lesson.subject} - {lesson.title}</h1>
      <p>{lesson.content}</p>
      <form onSubmit={handleSubmit}>
        <h2>Quiz</h2>
        {lesson.quiz.map((q, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <div><strong>{i + 1}. {q.question}</strong></div>
            {q.options.map((opt, j) => (
              <label key={j} style={{ display: 'block', marginLeft: 16 }}>
                <input
                  type="radio"
                  name={`q${i}`}
                  value={j}
                  checked={answers[i] === j}
                  onChange={() => handleChange(i, j)}
                  disabled={submitted}
                />{' '}{opt}
              </label>
            ))}
          </div>
        ))}
        {!submitted && <button type="submit" style={{ padding: '0.5rem 1rem', background: '#0052CC', color: '#fff', border: 'none', borderRadius: 4 }}>Submit Quiz</button>}
        {submitted && (
          <div style={{ marginTop: '1rem', color: 'green' }}>
            You scored {score} out of {lesson.quiz.length}!
          </div>
        )}
      </form>
      <a href="/" style={{ color: '#0052CC', textDecoration: 'underline', display: 'block', marginTop: '2rem' }}>Back to Home</a>
    </main>
  );
}
