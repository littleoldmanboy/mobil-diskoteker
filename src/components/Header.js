import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Logo from "./Logo";

export default async function Header() {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <header className="bg-darkGray text-white flex justify-between py-4 px-[30px]">
            <Logo />
            <nav>
                <ul className="flex gap-11">
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
