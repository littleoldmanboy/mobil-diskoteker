import { PrismicRichText } from '@prismicio/react';
import { isFilled } from '@prismicio/client';
import { createClient } from '@/prismicio';
import Bounded from '@/components/Bounded';
import Heading from '@/components/Heading';
import Filter from '@/components/Filter';
import React from 'react';

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

const Steps = async ({ slice }) => {

  const client = createClient();

  const steps = await Promise.all(
    slice.items.map((item) => {
      if (
        isFilled.contentRelationship(item.step) && item.step.uid
      ) {
        return client.getByUID("step", item.step.uid)
      }
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {steps.map((item, index) => item && (
        <div key={index}>
          <PrismicRichText components={components} field={item.data.question} />
          {item.data.filter_buttons.map((filter_buttonItem, index) => (
            <React.Fragment key={index}>
              <Filter>{filter_buttonItem?.filter_button?.data?.value || 'Placeholder text'}</Filter>
            </React.Fragment>
          ))}
        </div>
      ))}
    </Bounded>
  );
};

export default Steps;
