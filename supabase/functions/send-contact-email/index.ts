import { serve } from 'https://deno.land/x/sift@0.5.0/mod.ts';
import { createClient } from 'https://deno.land/x/supabase@1.0.0/mod.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

serve(async (req) => {
  const { name, email, phone, service, message } = await req.json();

  const emailContent = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Service: ${service}
    Message: ${message}
  `;

  // Send confirmation email to the user
  const { error: userError } = await supabase
    .from('emails')
    .insert([
      {
        to: email,
        subject: 'Thank you for contacting Movitax',
        text: `Dear ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nMovitax Team\n\n${emailContent}`
      }
    ]);

  if (userError) {
    return new Response(JSON.stringify({ error: userError.message }), { status: 500 });
  }

  // Send email to Movitax consultants
  const { error: adminError } = await supabase
    .from('emails')
    .insert([
      {
        to: 'movitaxconsultants@gmail.com',
        subject: 'New Contact Form Submission',
        text: emailContent
      }
    ]);

  if (adminError) {
    return new Response(JSON.stringify({ error: adminError.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
