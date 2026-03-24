import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8084/api/lessons')
      .then(res => res.json())
      .then(setLessons);
  }, []);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Available Lessons</h1>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id} style={{ marginBottom: '1rem' }}>
            <strong>{lesson.subject} - {lesson.title}</strong>
            <button style={{ marginLeft: 16, padding: '0.3rem 1rem' }} onClick={() => router.push(`/lesson/${lesson.id}`)}>
              View Lesson
            </button>
          </li>
        ))}
      </ul>
      <a href="/" style={{ color: '#0052CC', textDecoration: 'underline', display: 'block', marginTop: '2rem' }}>Back to Home</a>
    </main>
  );
}
