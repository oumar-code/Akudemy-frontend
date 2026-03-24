import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Simple page view tracking
    fetch('https://api.countapi.xyz/hit/akudemy/analytics')
      .then(res => res.json())
      .then(console.log);
  }, []);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Analytics</h1>
      <p>Page views are being tracked to measure interest in Akudemy.</p>
      <p>For advanced analytics, integrate with Google Analytics or a similar service.</p>
    </main>
  );
}
