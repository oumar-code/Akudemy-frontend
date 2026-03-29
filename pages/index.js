import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) setStatus('Thank you! You are on the waitlist.');
    else setStatus(data.error || 'Something went wrong.');
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Welcome to Akudemy</h1>
      <p>Quality education for every Nigerian student. WAEC, JAMB, NECO exam prep with 3D learning. Works offline. Start free today.</p>
      <form onSubmit={handleSubmit} style={{ margin: '2rem 0' }}>
        <label htmlFor="email">Join our waitlist:</label><br />
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{ padding: '0.5rem', width: '70%', marginRight: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', background: '#0052CC', color: '#fff', border: 'none', borderRadius: 4 }}>
          Sign Up
        </button>
      </form>
      {status && <div style={{ color: status.startsWith('Thank') ? 'green' : 'red', marginBottom: '1rem' }}>{status}</div>}
      <Link href="/demo-lesson" style={{ color: '#0052CC', textDecoration: 'underline', display: 'block', marginBottom: '1rem' }}>Try a Demo Lesson</Link>
      <Link href="/dashboard" style={{ color: '#0052CC', textDecoration: 'underline' }}>Go to Dashboard (coming soon)</Link>
    </main>
  );
}
