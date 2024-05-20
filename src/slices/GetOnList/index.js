/**
 * @typedef {import("@prismicio/client").Content.GetOnListSlice} GetOnListSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<GetOnListSlice>} GetOnListProps
 * @param {GetOnListProps}
 */
const GetOnList = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for get_on_list (variation: {slice.variation})
      Slices
    </section>
  );
};

export default GetOnList;
