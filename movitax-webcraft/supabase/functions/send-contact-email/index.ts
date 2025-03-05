
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message }: ContactEmailRequest = await req.json();

    // Send email to the company
    const emailResponse = await resend.emails.send({
      from: "Movitax Website <onboarding@resend.dev>",
      to: ["movitaxconsultants@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service of Interest:</strong> ${service || "Not specified"}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to the client
    const confirmationResponse = await resend.emails.send({
      from: "Movitax Consultants <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Movitax Consultants",
      html: `
        <h2>Thank you for contacting Movitax Consultants</h2>
        <p>Dear ${name},</p>
        <p>We have received your inquiry and our team will get back to you shortly.</p>
        <p>Here's a summary of the information you provided:</p>
        <ul>
          <li><strong>Service of Interest:</strong> ${service || "Not specified"}</li>
          <li><strong>Your Message:</strong> "${message}"</li>
        </ul>
        <p>Best regards,<br>The Movitax Consultants Team</p>
      `,
    });

    console.log("Emails sent successfully:", { 
      company: emailResponse, 
      confirmation: confirmationResponse 
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
