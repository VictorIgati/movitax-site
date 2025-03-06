import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

console.log('Email sending function triggered');
const handler: Handler = async (event, context) => {
  console.log('Function executed successfully!');
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
      body: '',
    };
  }

  try {
    const { name, email, phone, service, message } = JSON.parse(event.body);

    // Send email to the company
    console.log('Sending email to the company...');
    const emailResponse = await resend.emails.send({
      from: 'Movitax Website <onboarding@resend.dev>',
      to: ['movitaxconsultants@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service of Interest:</strong> ${service || 'Not specified'}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to the user
    console.log('Sending confirmation email to the user...');
    const confirmationResponse = await resend.emails.send({
      from: 'Movitax Consultants <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for contacting Movitax Consultants',
      html: `
        <h2>Thank you for contacting Movitax Consultants</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry and our team will get back to you shortly.</p>
        <p>Here's a summary of the information you provided:</p>
        <ul>
          <li><strong>Service of Interest:</strong> ${service || 'Not specified'}</li>
          <li><strong>Your Message:</strong> "${message}"</li>
        </ul>
        <p>Best regards,<br>The Movitax Consultants Team</p>
      `,
    });

    console.log('Emails sent successfully:', {
      company: emailResponse,
      confirmation: confirmationResponse,
      company: emailResponse,
      confirmation: confirmationResponse,
      company: emailResponse,
      confirmation: confirmationResponse,
      company: emailResponse,
      confirmation: confirmationResponse,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

export { handler };
