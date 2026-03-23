import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const resend = new Resend(resendKey);

  try {
    const { name, businessName, email, service, message } = await request.json();

    if (!name || !businessName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Pitt Growth Studio <hello@pittgrowthstudio.com>',
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

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
