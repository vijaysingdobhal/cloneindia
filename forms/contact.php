<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize it
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Check if all fields are filled
    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {
        // Set the recipient email address
        $to = "vijaydobhal12@gmail.com"; // Your email where you want to receive the message

        // Set the email subject
        $email_subject = "New Contact Form Submission: " . $subject;

        // Set the email body
        $email_body = "You have received a new message from the contact form on your website.\n\n";
        $email_body .= "Here are the details:\n";
        $email_body .= "Name: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Subject: $subject\n";
        $email_body .= "Message: $message\n";

        // Set the headers
        $headers = "From: $email\n";
        $headers .= "Reply-To: $email\n";

        // Send the email
        if (mail($to, $email_subject, $email_body, $headers)) {
            echo "Message sent successfully!";
        } else {
            echo "Error: Message could not be sent.";
        }
    } else {
        echo "All fields are required!";
    }
}
?>
