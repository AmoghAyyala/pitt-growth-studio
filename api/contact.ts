import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, businessName, email, service, message } = req.body ?? {};

    if (!name || !businessName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    await resend.emails.send({
      from: 'Pitt Growth Studio <onboarding@resend.dev>',
      to: 'pittgrowthstudio@gmail.com',
      replyTo: email,
      subject: `New website lead from ${businessName}`,
      text: `
Name: ${name}
Business: ${businessName}
Email: ${email}
Service: ${service}
Message:
${message}
      `.trim(),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
