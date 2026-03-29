import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    const res = await fetch('http://localhost:8084/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('akudemy_token', data.token);
      setStatus('Login successful!');
      setTimeout(() => router.push('/lessons'), 1000);
    } else {
      setStatus(data.error || 'Something went wrong.');
    }
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 400, margin: 'auto' }}>
      <h1>Login / Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', background: '#0052CC', color: '#fff', border: 'none', borderRadius: 4, width: '100%' }}>
          Login / Register
        </button>
      </form>
      {status && <div style={{ color: status.startsWith('Login') ? 'green' : 'red', marginTop: '1rem' }}>{status}</div>}
      <Link href="/" style={{ color: '#0052CC', textDecoration: 'underline', display: 'block', marginTop: '2rem' }}>Back to Home</Link>
    </main>
  );
}
