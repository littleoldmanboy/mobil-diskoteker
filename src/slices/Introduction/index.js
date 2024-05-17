/**
 * @typedef {import("@prismicio/client").Content.IntroductionSlice} IntroductionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IntroductionSlice>} IntroductionProps
 * @param {IntroductionProps}
 */
const Introduction = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for introduction (variation: {slice.variation})
      Slices
    </section>
  );
};

export default Introduction;
