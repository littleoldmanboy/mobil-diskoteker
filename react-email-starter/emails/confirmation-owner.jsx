import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

// Function component for the owner's/admin's confirmation email
export default function ConfirmationOwner({
  title = "LittleOldManBoy",
  locations = ["Nord-Midtjylland", "Syddanmark", "Sjælland"],
  musics = ["Pop", "Elektronisk", "Classics", "Jazz"],
  price = "3499",
  url = "https://dennisrussell.dk",
  link,
  email = "dennis.g.leerup@hotmail.com",
}) {
  return (
    <Html>
      <Head />
      {/* Preview text for the email client */}
      <Preview>Mail fra: {title}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Heading as="h6">Fra: {email}</Heading>
          <Heading className="mb-8" as="h1">
            {title}
          </Heading>
          <Heading as="h3">Område(r):</Heading>
          {locations.map((location) => (
            <Heading className="opacity-90" as="h5" key={location}>
              - {location}
            </Heading>
          ))}
          <Heading className="mt-8" as="h3">
            Musikstilart(er):
          </Heading>
          {musics.map((music) => (
            <Heading className="opacity-90" as="h5" key={music}>
              - {music}
            </Heading>
          ))}
          <Heading className="mt-8" as="h3">
            Minimumspris:
          </Heading>
          <Heading className="opacity-90" as="h5">
            {price} kr.
          </Heading>
          <Heading className="mt-8" as="h3">
            Hjemmeside-URL:
          </Heading>
          <Link href={url} className="text-blue-500 hover:text-blue-700 block">
            {url}
          </Link>
          {/* Conditionally display the optional link URL if provided */}
          {link && (
            <>
              <Heading className="mt-8" as="h3">
                link-URL:
              </Heading>
              <Link
                href={link}
                className="text-blue-500 hover:text-blue-700 block"
              >
                {link}
              </Link>
            </>
          )}
        </Body>
      </Tailwind>
    </Html>
  );
}
