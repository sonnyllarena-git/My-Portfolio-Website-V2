export async function sendInquiryNotification({
  name,
  email,
  subject,
  message,
}) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      reply_to: email,
      subject: `New portfolio inquiry: ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  })
  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Resend API error (${response.status}): ${body}`)
  }
}
