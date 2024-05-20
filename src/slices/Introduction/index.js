import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";

/**
 * @typedef {import("@prismicio/client").Content.IntroductionSlice} IntroductionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IntroductionSlice>} IntroductionProps
 * @param {IntroductionProps}
 */

const components = {
  heading2: ({ children }) => (
    <Heading
      as="h2"
      size="md"
      className="tracking-widest text-center text-white mb-5"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-[13px] text-center tracking-wider text-white/90 leading-relaxed">
      {children}
    </p>
  ),
};

const Introduction = ({ slice }) => {
  return (
    <>
      {slice.variation === "default" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="lg:h-svh flex my-12 mx-auto max-w-2xl"
        >
          <div className="my-auto flex flex-col gap-16">
            <div className="flex flex-col items-center justify-center gap-3">
              <PrismicRichText
                field={slice.primary.heading}
                components={components}
              />
              <PrismicRichText field={slice.primary.body} components={components} />
              <span className="bg-gradient-to-r	from-purpleIsh to-greenIsh rounded-full p-px mt-11 drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.25)]">
                <Button
                  field={slice.primary.button_link}
                  className="text-xs w-[82px] h-[46px] bg-[#303030] hover:bg-[#3a3a3a]"
                >
                  {slice.primary.button_text}
                </Button>
              </span>
            </div>
            <div>
              <PrismicNextImage
                field={slice.primary.image}
                className="rounded-sm mx-auto drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)]"
              />
            </div>
          </div>
        </Bounded>
      )}
      {slice.variation === "imageFirst" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="lg:h-svh flex my-12 mx-auto max-w-2xl"
        >
          <div className="my-auto flex flex-col gap-16">
            <div className="order-2 lg:order-1">
              <PrismicNextImage
                field={slice.primary.image}
                className="rounded-sm mx-auto drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)]"
              />
            </div>
            <div className="order-1 lg:order-2 flex flex-col items-center justify-center gap-3">
              <PrismicRichText
                field={slice.primary.heading}
                components={components}
              />
              <PrismicRichText field={slice.primary.body} components={components} />
              <span className="bg-gradient-to-r	from-purpleIsh to-greenIsh rounded-full p-px mt-11 drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.25)]">
                <Button
                  field={slice.primary.button_link}
                  className="text-xs w-[82px] h-[46px] bg-[#303030] hover:bg-[#3a3a3a]"
                >
                  {slice.primary.button_text}
                </Button>
              </span>
            </div>
          </div>
        </Bounded>
      )}
    </>
  );
};

export default Introduction;
