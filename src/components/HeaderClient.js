"use client";

import { useState } from "react";
import { PrismicNextLink } from "@prismicio/next";
import Logo from "@/components/Logo";
import Bounded from "@/components/Bounded";

export default function HeaderClient({ navigation }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <Bounded as="header" className="text-white bg-darkGray fixed w-full z-50">
            <div className="flex justify-between items-center lg:p-0">
                <Logo />
                <div className="flex lg:hidden opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in-out">
                    <button onClick={toggleMenu} className="focus:outline-none py-3 pl-3">
                        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <nav className={`fixed lg:static top-0 left-0 w-full h-full bg-darkGray transition-transform transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:transition-none`}>
                    <div className="flex justify-end px-[30px] py-4 lg:hidden opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in-out">
                        <button onClick={toggleMenu} className="focus:outline-none">
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <ul className="flex flex-col lg:flex-row lg:gap-11 lg:items-center lg:justify-end h-full lg:h-auto">
                        {navigation.map(({ link, label }) => (
                            <li key={label} className="opacity-80 hover:opacity-100 transition-opacity duration-200 ease-in-out lg:my-0 my-3 text-center lg:text-left">
                                <PrismicNextLink field={link} className="py-4 tracking-wider text-white block lg:inline" onClick={closeMenu}>
                                    {label}
                                </PrismicNextLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </Bounded>
    );
}
