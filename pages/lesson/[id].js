import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LessonDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [lesson, setLesson] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [token, setToken] = useState('');
  const [progressMsg, setProgressMsg] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8084/api/lessons/${id}`)
        .then(res => res.json())
        .then(setLesson);
    }
    setToken(localStorage.getItem('akudemy_token') || '');
  }, [id]);

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
    if (token) {
      fetch(`http://localhost:8084/api/progress/${lesson.id}`,
        { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setProgressMsg(data.message || ''));
    }
  };

  if (!lesson) return <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>Loading...</main>;

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>{lesson.subject} - {lesson.title}</h1>
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
            {progressMsg && <div style={{ marginTop: 8 }}>{progressMsg}</div>}
          </div>
        )}
      </form>
      <Link href="/lessons" style={{ color: '#0052CC', textDecoration: 'underline', display: 'block', marginTop: '2rem' }}>Back to Lessons</Link>
    </main>
  );
}
