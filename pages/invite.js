export default function Invite() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 600, margin: 'auto' }}>
      <h1>Invite Early Users</h1>
      <p>We are looking for students, teachers, and educational content creators to try Akudemy and provide feedback!</p>
      <ul>
        <li><b>Students:</b> Try lessons, quizzes, and track your progress.</li>
        <li><b>Teachers:</b> Explore content creation and classroom features.</li>
        <li><b>Content Creators:</b> Help us expand our lesson library.</li>
      </ul>
      <p>Interested? <a href="/feedback" style={{ color: '#0052CC', textDecoration: 'underline' }}>Give Feedback</a> or email us at <a href="mailto:team@akulearn.com">team@akulearn.com</a>.</p>
    </main>
  );
}
