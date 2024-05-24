import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Contact from "@/components/Contact";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.ContactFormSlice} ContactFormSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContactFormSlice>} ContactFormProps
 * @param {ContactFormProps}
 */

const components = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="tracking-widest mb-6">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="xs" className="tracking-wider mb-8">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="xxs" className="tracking-wider mt-12 mb-6">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-base tracking-wider opacity-90 leading-7 mb-16 text-center mt-16">
      {children}
    </p>
  ),
};

const ContactForm = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="max-w-[700px] mx-auto mb-16 text-white"
    >
      <PrismicRichText field={slice.primary.heading} components={components} />
      <Contact />
      <PrismicRichText field={slice.primary.outro} components={components} />
    </Bounded>
  );
};

export default ContactForm;
