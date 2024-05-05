import { PrismicRichText } from '@prismicio/react';
import Bounded from '@/components/Bounded';
import Heading from '@/components/Heading';
import { createClient, isFilled } from '@prismicio/client';

/**
 * @typedef {import("@prismicio/client").Content.ResultsSlice} ResultsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ResultsSlice>} ResultsProps
 * @param {ResultsProps}
 */

const components = {
  heading1: ({ children }) => (
    <Heading as="h2" size="md" className="tracking-wider">{children}</Heading>
  ),
  paragraph: ({ children }) => (
    <p className='text-[13px] tracking-wider text-white'>{children}</p>
  ),
};

const Results = async ({ slice }) => {

  const client = createClient();

  const results = await Promise.all(
    slice.items.map((item) => {
      if (
        isFilled.contentRelationship(item.result) && item.result.uid
      ) {
        return client.getByUID("result", item.result.uid)
      }
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText components={components} field={slice.primary.heading} />
      <div>
        {results.map((item, index) => item && (
          <div key={index}>
            <PrismicRichText components={components} field={item.data.title} />
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Results;
