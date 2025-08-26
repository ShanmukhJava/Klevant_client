<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Create error log file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__.'/php_errors.log');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verify form data is received
    error_log("Form submitted with data: ".print_r($_POST, true));
    
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $service = $_POST['service'] ?? '';
    $company = $_POST['company'] ?? 'Not specified';
    $property = $_POST['property'] ?? 'Not specified';
    
    $mail = new PHPMailer(true);

    try {
        // SMTP Debugging
        $mail->SMTPDebug = 2; // Enable verbose debug output
        $mail->Debugoutput = function($str, $level) {
            error_log("PHPMailer: $str");
        };

        // SMTP settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.hostinger.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mailing@ksquaremediahub.in';
        $mail->Password   = 'Klevant@2025';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL
        $mail->Port       = 465;

        // Sender & recipient
        $mail->setFrom('mailing@ksquaremediahub.in', 'Klevant Technologies');
        $mail->addAddress('klevantautomate@gmail.com');
        $mail->addReplyTo($email, $name);

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission: ' . $service;
        $mail->Body    = "
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Service:</strong> $service</p>
            <p><strong>Company:</strong> $company</p>
            <p><strong>Property Type:</strong> $property</p>
        ";

        if ($mail->send()) {
            echo json_encode(['success' => true, 'message' => 'Email sent successfully!']);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to send email']);
        }
    } catch (Exception $e) {
        error_log("Mailer Error: ".$e->getMessage());
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>