import Link from 'next/link';

export default function Dashboard() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Akudemy Dashboard</h1>
      <p><strong>Coming soon!</strong> Here you’ll see your enrolled courses, progress, and personalized recommendations.</p>
      <p>We’re working hard to bring you the best learning experience. Stay tuned!</p>
      <Link href="/" style={{ color: '#0052CC', textDecoration: 'underline' }}>Back to Home</Link>
    </main>
  );
}
