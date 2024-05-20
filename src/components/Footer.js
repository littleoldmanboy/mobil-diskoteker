import Image from "next/image";
import Bounded from "@/components/Bounded";

export default function Footer() {
    return <Bounded as="footer" className="text-white py-4 flex justify-center items-center relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-px w-screen bg-[#464646]"></div>
        <a href="/#home" className="py-4">
            <Image src="/logo.png" width={297} height={297} alt="Logo" quality={100} />
        </a>
    </Bounded>;
}