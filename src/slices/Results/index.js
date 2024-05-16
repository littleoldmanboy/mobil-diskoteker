import { PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import React from "react";
import ResultsMenu from "@/components/ResultsMenu";

/**
 * @typedef {import("@prismicio/client").Content.ResultsSlice} ResultsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ResultsSlice>} ResultsProps
 * @param {ResultsProps}
 */

const Results = async ({ slice }) => {
  const client = createClient();

  const results = await Promise.all(
    slice.items.map((item) => {
      if (isFilled.contentRelationship(item.result) && item.result.uid) {
        return client.getByUID("result", item.result.uid);
      }
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="lg:h-svh flex flex-col w-fit sm:w-auto mx-auto sm:mx-0 relative"
    >
      <div className="lg:h-[711px] overflow-y-auto overflow-x-hidden my-auto flex flex-col gap-6 py-6">
        <ResultsMenu results={results} />
      </div>
    </Bounded>
  );
};

export default Results;
