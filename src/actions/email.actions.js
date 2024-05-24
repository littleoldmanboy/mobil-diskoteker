"use server";

import { Resend } from "resend";
import ConfirmationUser from "../../react-email-starter/emails/confirmation-user";
import ConfirmationOwner from "../../react-email-starter/emails/confirmation-owner";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendUserConfirmationEmail({
  title,
  locations,
  musics,
  price,
  url,
  link,
  email,
}) {
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

  if (error) {
    console.error(error);
    return "error";
  }

  if (data) {
    return "success";
  }

  return "error";
}

export async function sendOwnerConfirmationEmail({
  title,
  locations,
  musics,
  price,
  url,
  link,
  email,
}) {
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

  if (error) {
    console.error(error);
    return "error";
  }

  if (data) {
    return "success";
  }

  return "error";
}
