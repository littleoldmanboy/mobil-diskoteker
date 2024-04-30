import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import Bounded from "@/components/Bounded";

export default async function Footer() {
    const client = createClient();
    const settings = await client.getSingle("settings");
    return <Bounded as="footer" className="text-white py-4 flex justify-between items-center">
        <a href="/" className="py-4">
            <Image src="/logo.png" width={297} height={297} alt="Logo" quality={100} />
        </a>
        <ul className="flex-column my-auto gap-5">
            {settings.data.navigation.map(({link, label})=>(
                <li key={label}>
                    <PrismicNextLink field={link}>{label}</PrismicNextLink>
                </li>
            ))}
        </ul>
    </Bounded>;
}