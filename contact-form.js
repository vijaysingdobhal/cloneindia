const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey('your-sendgrid-api-key'); // Replace with your SendGrid API key

exports.handler = async (event, context) => {
  // Ensure the request is POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Only POST requests are allowed' }),
    };
  }

  // Parse form data from the POST body
  const { name, email, subject, message } = JSON.parse(event.body);

  // Ensure all required fields are present
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'All fields are required' }),
    };
  }

  // Set up the email content using SendGrid
  const msg = {
    to: 'vijaydobhal12@gmail.com', // Replace with your recipient email
    from: 'your-email@example.com', // Replace with your "from" email (should be verified on SendGrid)
    subject: `New Contact Message: ${subject}`,
    text: `You have received a new message from ${name} (${email}). Here are the details:\n\n${message}`,
  };

  try {
    // Send the email using SendGrid
    await sendgrid.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
    };
  }
};
