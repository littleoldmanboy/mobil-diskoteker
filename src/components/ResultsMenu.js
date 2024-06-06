"use client";

import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Fragment } from "react";
import Button from "./Button";
import Heading from "./Heading";
import useStore from "@/store/useStore";
import { useChoiceStore } from "@/store";
import { formatResults } from "@/utils/formatResult";
import { filterResults } from "@/utils/filterResults";
import { motion } from "framer-motion";

const components = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="tracking-wider text-white">
      {children}
    </Heading>
  ),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function ResultsMenu({ results }) {
  const choices = useStore(useChoiceStore, (state) => state.choices);

  const formattedResults = formatResults(results);
  const sortedResults = filterResults(formattedResults, choices);

  if (!choices) {
    return <div className="text-[#e7e7e7] tracking-wider">Indlæser...</div>;
  }

  if (sortedResults.length === 0) {
    return (
      <div className="text-[#e7e7e7] tracking-wider">Ingen resultater</div>
    );
  }

  return (
    <>
      {sortedResults.map(
        (item, index) =>
          item && (
            <motion.div
              key={`${item.id}-${choices}-${index}`} // Ensure re-animation on choices update
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={index}
              variants={fadeInUp}
            >
              <div className="flex flex-col sm:flex-row p-4 bg-[#262729] rounded-3xl justify-between drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)] max-w-[205px] sm:min-w-full mx-auto gap-2 sm:gap-0">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <PrismicNextImage
                    width={173}
                    height={173}
                    field={item.image}
                    className="rounded-3xl self-center sm:self-auto"
                    imgixParams={{ ar: "1:1", fit: "crop" }}
                  />
                  <div className="flex flex-col justify-between px-4 py-[10px] text-center items-center sm:text-start sm:items-start gap-2 sm:gap-0">
                    <div className="flex flex-col items-center sm:items-start">
                      <div className="flex flex-col sm:flex-row items-center opacity-60 tracking-wider text-white">
                        {item.locations.map((locationItem, index) => (
                          <Fragment key={index}>
                            <p className="text-[13px]">{locationItem}</p>
                            {index !== item.locations.length - 1 && (
                              <span className="hidden sm:block mx-1 text-xs">
                                •
                              </span>
                            )}
                          </Fragment>
                        ))}
                      </div>
                      <PrismicRichText
                        components={components}
                        field={item.title}
                      />
                      <div className="flex items-center tracking-wider text-white">
                        {item.music_styles.map((music_styleItem, index) => (
                          <Fragment key={index}>
                            <p className="text-[13px]">{music_styleItem}</p>
                            {index !== item.music_styles.length - 1 && (
                              <span className="mx-1 text-xs">•</span>
                            )}
                          </Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="text-white flex tracking-wider gap-2">
                      <p className="md:text-3xl text-2xl">{item.price}</p>
                      <span className="self-end text-xl opacity-60">kr.</span>
                    </div>
                  </div>
                </div>
                <Button
                  field={item.button_link}
                  className="text-[13px] w-[85px] h-[56px] border border-[#6a6a6a] hover:bg-[#393a3b] self-center sm:self-end"
                >
                  Book
                </Button>
              </div>
            </motion.div>
          )
      )}
    </>
  );
}
