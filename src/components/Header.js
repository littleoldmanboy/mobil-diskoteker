import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Logo from "@/components/Logo";
import Bounded from "@/components/Bounded";

export default async function Header() {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <Bounded as="header" className="text-white flex justify-between">
            <Logo />
            <nav className="my-auto">
                <ul className="flex gap-11">
                    {settings.data.navigation.map(({link, label}) => (
                        <li key={label}>
                            <PrismicNextLink field={link} className="py-4">{label}</PrismicNextLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </Bounded>
    );
}
