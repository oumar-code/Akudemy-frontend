import { useState } from 'react';

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Send feedback to backend or email service
    setSubmitted(true);
  }

  if (submitted) {
    return <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 500, margin: 'auto' }}>
      <h1>Thank you for your feedback!</h1>
      <p>We appreciate your input and will use it to improve Akudemy.</p>
    </main>;
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: 500, margin: 'auto' }}>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:<br /><input name="name" value={form.name} onChange={handleChange} required /></label><br /><br />
        <label>Email:<br /><input name="email" type="email" value={form.email} onChange={handleChange} required /></label><br /><br />
        <label>Role:<br />
          <select name="role" value={form.role} onChange={handleChange} required>
            <option value="">Select...</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="content_creator">Content Creator</option>
            <option value="other">Other</option>
          </select>
        </label><br /><br />
        <label>Feedback:<br /><textarea name="message" value={form.message} onChange={handleChange} required rows={5} /></label><br /><br />
        <button type="submit">Submit Feedback</button>
      </form>
    </main>
  );
}
