"use client";

import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

/**
 * @typedef {import("@prismicio/client").Content.GetOnListSlice} GetOnListSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<GetOnListSlice>} GetOnListProps
 * @param {GetOnListProps}
 */

const components = {
  heading1: ({ children }) => (
    <Heading as="h2" size="md" className="tracking-widest mb-6">
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading
      as="h2"
      size="md"
      className="tracking-widest mb-6 bg-gradient-to-r from-purpleIsh to-greenIsh text-transparent bg-clip-text"
    >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="xs" className="tracking-wider mb-6">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="xxs" className="tracking-wider mt-12 mb-6">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-[13px] tracking-wider opacity-90 leading-7 mb-16">
      {children}
    </p>
  ),
};

const GetOnList = ({ slice }) => {
  const [lastCopiedIndex, setLastCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setLastCopiedIndex(index);
        setTimeout(() => setLastCopiedIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Kunne ikke kopiere: ", err);
      });
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-white max-w-[700px] mx-auto mb-14"
    >
      <>
        <PrismicRichText
          field={slice.primary.heading1}
          components={{ heading2: components.heading1 }}
        />
        <PrismicRichText field={slice.primary.body1} components={components} />
        <PrismicRichText
          field={slice.primary.heading2}
          components={{ heading2: components.heading2 }}
        />
        <PrismicRichText field={slice.primary.body2} components={components} />
        <PrismicRichText
          field={slice.primary.heading3}
          components={components}
        />
        <PrismicRichText field={slice.primary.body3} components={components} />
        <div className="text-center flex flex-col gap-4 -mt-8">
          {slice.items.map((item, index) => (
            <div
              className="flex flex-col gap-3 bg-[#262729] rounded-full w-full py-[14px] px-5 relative drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)]"
              key={index}
            >
              <div className="flex justify-center gap-3 flex-wrap">
                <p className="text-[13px] tracking-wide leading-7 break-all">
                  {item.code}
                </p>
                <div className="flex relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    onClick={() => copyToClipboard(item.code, index)}
                    className="cursor-pointer my-auto"
                  >
                    <path
                      fill="#fff"
                      d="M12.33.33H5.67c-.74 0-1.34.6-1.34 1.34v2.66H1.67c-.74 0-1.34.6-1.34 1.34v6.66c0 .74.6 1.34 1.34 1.34h6.66c.74 0 1.34-.6 1.34-1.34V9.67h2.66c.74 0 1.34-.6 1.34-1.34V1.67c0-.74-.6-1.34-1.34-1.34Zm-10.66 12V5.67h6.66v6.66H1.67Zm10.66-4H9.67V5.67c0-.74-.6-1.34-1.34-1.34H5.67V1.67h6.66v6.66Z"
                    />
                  </svg>
                  {lastCopiedIndex === index && (
                    <span className="bg-darkGray py-2 px-3 rounded-xl text-[12px] text-[#e7e7e7] font-normal tracking-wider absolute -top-8 right-2">
                      Kopieret!
                    </span>
                  )}
                </div>
              </div>
              <PrismicNextLink
                field={item.link}
                className="underline text-[13px] tracking-wider opacity-80"
              >
                {item.link_text}
              </PrismicNextLink>
            </div>
          ))}
        </div>
        <PrismicRichText
          field={slice.primary.heading4}
          components={components}
        />
        <PrismicRichText field={slice.primary.body4} components={components} />
      </>
    </Bounded>
  );
};

export default GetOnList;
