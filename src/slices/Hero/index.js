import { PrismicRichText } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";

/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @param {HeroProps} props
 */

const components = {
  heading1: ({ children }) => (
    <Heading
      as="h1"
      size="xl"
      className="tracking-widest font-medium text-center bg-gradient-to-r from-purpleIsh to-greenIsh text-transparent bg-clip-text max-w-[900px]"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-[13px] font-normal text-center tracking-widest text-white opacity-60 max-w-72 mt-[40px] leading-snug">
      {children}
    </p>
  ),
};

const Hero = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          id="home"
          className="h-svh flex justify-center lg:col-span-2 relative"
        >
          <div className="flex flex-col items-center justify-center">
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <PrismicRichText field={slice.primary.body} components={components} />
            <span className="bg-gradient-to-r	from-purpleIsh to-greenIsh rounded-full p-px mt-[18px] drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.25)]">
              <Button
                field={slice.primary.button_link}
                className="text-[15px] font-medium w-[110px] h-[58px] bg-[#303030] hover:bg-[#3a3a3a]"
              >
                {slice.primary.button_text}
              </Button>
            </span>
          </div>
          <a
            href="#arrow-target"
            className="absolute bottom-8 opacity-40 cursor-pointer hover:opacity-100 transition-opacity duration-200 ease-in-out p-3"
          >
            <svg
              width="25"
              height="14"
              viewBox="0 0 25 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.7864 0.535358C23.4435 0.192568 22.9785 -1.26672e-06 22.4937 -1.7831e-06C22.0088 -2.29949e-06 21.5438 0.192566 21.2009 0.535355L12.1499 9.58639L3.09884 0.535336C2.75398 0.202261 2.2921 0.0179585 1.81268 0.022124C1.33325 0.0262896 0.874642 0.21859 0.535623 0.557607C0.196605 0.896624 0.00430613 1.35523 0.000139541 1.83466C-0.00402705 2.31408 0.180274 2.77597 0.513349 3.12082L10.8571 13.4646C11.2 13.8074 11.665 14 12.1499 14C12.6347 14 13.0997 13.8074 13.4426 13.4646L23.7864 3.12085C24.1292 2.77796 24.3218 2.31296 24.3218 1.8281C24.3218 1.34325 24.1292 0.878252 23.7864 0.535358Z"
                fill="white"
              />
            </svg>
          </a>
          <div className="absolute bottom-0 h-px w-screen bg-[#464646]"></div>
        </Bounded>
      )}
      {slice.variation === "noButton" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          id="get-on-list"
          className="pt-40 pb-28 flex justify-center lg:col-span-2"
        >
          <div className="flex flex-col items-center justify-center">
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <PrismicRichText field={slice.primary.body} components={components} />
          </div>
        </Bounded>
      )}
    </>
  );
};

export default Hero;
