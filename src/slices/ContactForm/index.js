import Contact from "@/components/Contact";

/**
 * @typedef {import("@prismicio/client").Content.ContactFormSlice} ContactFormSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContactFormSlice>} ContactFormProps
 * @param {ContactFormProps}
 */
const ContactForm = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Contact />
    </section>
  );
};

export default ContactForm;
