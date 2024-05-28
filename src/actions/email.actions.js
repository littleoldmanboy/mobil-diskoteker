"use server";

// Import the Resend module and the email templates for user and owner confirmations
import { Resend } from "resend";
import ConfirmationUser from "../../react-email-starter/emails/confirmation-user";
import ConfirmationOwner from "../../react-email-starter/emails/confirmation-owner";

// Initialize the Resend client with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to send a confirmation email to the user
export async function sendUserConfirmationEmail({
  title,
  locations,
  musics,
  price,
  url,
  link,
  email,
}) {
  // Use the Resend client to send an email with the given details
  const { data, error } = await resend.emails.send({
    from: "Mobil-Diskoteker.dk <mobildiskotekerne@dennisrussell.dk>",
    to: [email],
    subject: "Bekræftelse af din booking",
    react: ConfirmationUser({
      title,
      locations,
      musics,
      price,
      url,
      link,
    }),
  });

  // Log an error if the email fails to send
  if (error) {
    console.error(error);
    return "error";
  }

  // Return "success" if the email sends successfully, otherwise "error"
  if (data) {
    return "success";
  }

  return "error";
}

// Function to send a confirmation email to the owner/admin
export async function sendOwnerConfirmationEmail({
  title,
  locations,
  musics,
  price,
  url,
  link,
  email,
}) {
  // Use the Resend client to send an email with the given details
  const { data, error } = await resend.emails.send({
    from: "Mobil-Diskoteker.dk <mobildiskotekerne@dennisrussell.dk>",
    to: ["dennis.g.leerup@hotmail.com"],
    subject: "Bekræftelse af din booking",
    react: ConfirmationOwner({
      title,
      locations,
      musics,
      price,
      url,
      link,
      email,
    }),
  });

  // Log an error if the email fails to send
  if (error) {
    console.error(error);
    return "error";
  }

  // Return "success" if the email sends successfully, otherwise "error"
  if (data) {
    return "success";
  }

  return "error";
}
