'use client';

import { PrismicRichText } from '@prismicio/react';
import { isFilled } from '@prismicio/client';
import { createClient } from '@/prismicio';
import Bounded from '@/components/Bounded';
import Heading from '@/components/Heading';
import Filter from '@/components/Filter';
import InfoButton from '@/components/InfoButton';
import React, { useState, useEffect, useRef } from 'react';

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
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeInfoButtonIndex, setActiveInfoButtonIndex] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const client = createClient();
    const fetchSteps = async () => {
      const fetchedSteps = await Promise.all(
        slice.items.map((item) => {
          if (isFilled.contentRelationship(item.step) && item.step.uid) {
            return client.getByUID("step", item.step.uid, {
              fetchLinks: ["filter_button.value", "filter_button.description"]
            });
          }
          return null;
        })
      );
      setSteps(fetchedSteps.filter(step => step !== null));
    };

    fetchSteps();
  }, [slice.items]);

  const handleFilterButtonClick = (nextStepIndex) => {
    if (nextStepIndex < steps.length) {
      setCurrentStepIndex(nextStepIndex);
    }
  };

  const handleInfoButtonClick = (index) => {
    if (activeInfoButtonIndex === index) {
      setActiveInfoButtonIndex(null);
    } else {
      setActiveInfoButtonIndex(index);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setActiveInfoButtonIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="h-svh flex"
    >
      <div className='h-[711px] my-auto py-6'>
        {steps.length > 0 && steps[currentStepIndex] && (
          <div>
            <PrismicRichText components={components} field={steps[currentStepIndex].data.question} />
            <div className='flex gap-4 mt-9'>
              {steps[currentStepIndex].data.filter_buttons.map((filter_buttonItem, index) => (
                <div key={index} className='relative w-fit'>
                  <Filter onClick={() => handleFilterButtonClick(currentStepIndex + 1)}>
                    {filter_buttonItem.filter_button.data?.value}
                  </Filter>
                  <InfoButton onClick={() => handleInfoButtonClick(index)}>i</InfoButton>
                  {activeInfoButtonIndex === index && (
                    <div ref={modalRef} className='absolute text-center bg-[#333333] py-3 px-4 mt-2 rounded-xl text-[#e7e7e7] text-[13px] font-normal tracking-wider'>
                      <p>{filter_buttonItem.filter_button.data?.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default Steps;
