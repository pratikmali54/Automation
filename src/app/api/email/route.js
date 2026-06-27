import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/smtp';

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, html, text } = body;

    if (!to || !subject) {
      return NextResponse.json({ success: false, message: 'to and subject are required' }, { status: 400 });
    }

    await sendEmail({ to, subject, html, text: text || html });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Failed to send email' }, { status: 500 });
  }
}
