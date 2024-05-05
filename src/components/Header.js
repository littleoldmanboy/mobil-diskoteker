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
            <div className="flex gap-11">
                <nav className="my-auto">
                    <ul className="flex gap-11">
                        {settings.data.navigation.map(({link, label}) => (
                            <li key={label} className="opacity-75 hover:opacity-100 transition-opacity duration-200 ease-in-out">
                                <PrismicNextLink field={link} className="py-4 tracking-wider">{label}</PrismicNextLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="my-auto cursor-pointer opacity-75 hover:opacity-100 transition-opacity duration-200 ease-in-out">
                    <path d="M12.5815 12L9.98432 9.39821M11.4236 5.92105C11.4236 7.2262 10.9051 8.47789 9.98224 9.40076C9.05937 10.3236 7.80768 10.8421 6.50253 10.8421C5.19739 10.8421 3.9457 10.3236 3.02282 9.40076C2.09995 8.47789 1.58148 7.2262 1.58148 5.92105C1.58148 4.61591 2.09995 3.36422 3.02282 2.44134C3.9457 1.51847 5.19739 1 6.50253 1C7.80768 1 9.05937 1.51847 9.98224 2.44134C10.9051 3.36422 11.4236 4.61591 11.4236 5.92105Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        </Bounded>
    );
}
