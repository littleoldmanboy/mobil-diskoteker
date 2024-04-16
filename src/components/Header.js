import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Logo from "./Logo";

export default async function Header() {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <header className="bg-darkGray text-white flex justify-between p-4">
            <Logo />
            <nav>
                <ul className="flex gap-5">
                    {settings.data.navigation.map(({link, label}) => (
                        <li key={label}>
                            <PrismicNextLink field={link}>{label}</PrismicNextLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
