import { PrismicRichText } from '@prismicio/react';
import { isFilled } from '@prismicio/client';
import { createClient } from '@/prismicio';
import Bounded from '@/components/Bounded';
import Heading from '@/components/Heading';
import Filter from '@/components/Filter';
import InfoButton from '@/components/InfoButton';
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
      if (isFilled.contentRelationship(item.step) && item.step.uid) {
        return client.getByUID("step", item.step.uid, {
          fetchLinks: ['filter_button.value, filter_button.description']
        });
      }
      return Promise.resolve(null);
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-36"
    >
      {steps.map((item, index) => item && (
        <div key={index}>
          <PrismicRichText components={components} field={item.data.question} />
          <div className='flex gap-4 mt-9'>
            {item.data.filter_buttons.map((filter_buttonItem, index) => (
              <React.Fragment key={index}>
                <div className='relative w-fit'>
                  <Filter>{filter_buttonItem.filter_button.data.value}</Filter>
                  <InfoButton>i</InfoButton>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </Bounded>
  );
};

export default Steps;
