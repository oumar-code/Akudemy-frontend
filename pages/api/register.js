// Simple email registration API (in-memory, for MVP demo)
let emails = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required.' });
    }
    emails.push(email);
    return res.status(200).json({ message: 'Registered successfully!' });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
