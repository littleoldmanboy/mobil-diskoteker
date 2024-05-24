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

export default function ConfirmationOwner({
  title = "Børge",
  locations = ["København", "Aarhus"],
  musics = ["Pop", "Rock"],
  price = "5000",
  url = "https://example.com",
  link = "https://another_example.com",
  email = "morten@hansekattesuppe.dk",
}) {
  return (
    <Html>
      <Head />
      <Preview>Bekræftelsesmail på: {title}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Text>From: {email}</Text>
          <Text>{title}</Text>
          {locations.map((location) => (
            <Text key={location}>{location}</Text>
          ))}
          {musics.map((music) => (
            <Text key={music}>{music}</Text>
          ))}
          <Text>{price}</Text>
          <Link href={url} className="text-blue-500 hover:text-blue-700 block">
            {url}
          </Link>
          <Link href={link} className="text-blue-500 hover:text-blue-700 block">
            {link}
          </Link>
        </Body>
      </Tailwind>
    </Html>
  );
}
