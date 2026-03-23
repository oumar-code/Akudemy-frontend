import { useEffect, useState } from 'react';

export default function Progress() {
  const [progress, setProgress] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('akudemy_token') || '');
    fetch('http://localhost:8084/api/lessons')
      .then(res => res.json())
      .then(setLessons);
    if (token) {
      fetch('http://localhost:8084/api/progress', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(setProgress);
    }
  }, [token]);

  if (!token) return <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>Please <a href="/login">login</a> to view your progress.</main>;
  if (!progress || lessons.length === 0) return <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>Loading...</main>;

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Your Progress</h1>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>
            {lesson.subject} - {lesson.title}: {progress[lesson.id] ? '✅ Completed' : '❌ Not completed'}
          </li>
        ))}
      </ul>
      <a href="/lessons" style={{ color: '#0052CC', textDecoration: 'underline', display: 'block', marginTop: '2rem' }}>Back to Lessons</a>
    </main>
  );
}
