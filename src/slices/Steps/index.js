import { PrismicRichText } from '@prismicio/react';
import { isFilled } from '@prismicio/client';
import { createClient } from '@/prismicio';
import Bounded from '@/components/Bounded';
import Heading from '@/components/Heading';
import Filter from '@/components/Filter';

/**
 * @typedef {import("@prismicio/client").Content.StepsSlice} StepsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StepsSlice>} StepsProps
 * @param {StepsProps}
 */

const components = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="tracking-widest text-white">{children}</Heading>
  ),
};

const Steps = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for steps (variation: {slice.variation}) Slices
    </Bounded>
  );
};

export default Steps;
