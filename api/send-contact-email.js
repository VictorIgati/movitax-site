// Netlify function to handle contact form submissions
export default async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, phone, service, message } = JSON.parse(event.body);
    
    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" })
      };
    }

    // Here you would typically integrate with an email service like SendGrid, Mailgun, etc.
    // For now, we'll just log the submission and return success
    console.log("Contact form submission:", { name, email, phone, service, message });

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Form submission received successfully" 
      })
    };
  } catch (error) {
    console.error("Error processing form submission:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process form submission" })
    };
  }
};
