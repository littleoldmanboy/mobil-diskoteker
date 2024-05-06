import { PrismicRichText } from '@prismicio/react';
import Bounded from '@/components/Bounded';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import { isFilled } from '@prismicio/client';
import { createClient } from '@/prismicio';
import { PrismicNextImage } from '@prismicio/next';
import React from 'react';

/**
 * @typedef {import("@prismicio/client").Content.ResultsSlice} ResultsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ResultsSlice>} ResultsProps
 * @param {ResultsProps}
 */

const components = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="tracking-wider text-white">{children}</Heading>
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
      className="flex flex-col gap-6"
    >
      {results.map((item, index) => item && (
        <div key={index} className='flex p-4 bg-[#2b2b2b] rounded-3xl justify-between'>
          <div className='flex'>
            <PrismicNextImage 
              width={173} 
              height={173} 
              field={item.data.image} 
              className='rounded-3xl' 
              imgixParams={{ar: '1:1', fit: 'crop'}}
            />
            <div className='flex flex-col justify-between px-4 py-[10px]'>
              <div>
                <div className='flex items-center opacity-60 tracking-wider text-white'>
                  {item.data.locations.map((locationItem, index) => (
                    <React.Fragment key={index}>
                      <p className='text-[13px]'>{locationItem.location}</p>
                      {index !== item.data.locations.length - 1 && 
                        <span className='mx-1 text-xs'>•</span>
                      }
                    </React.Fragment>
                  ))}
                </div>
                <PrismicRichText components={components} field={item.data.title} />
                <div className='flex items-center tracking-wider text-white'>
                  {item.data.music_styles.map((music_styleItem, index) => (
                    <React.Fragment key={index}>
                      <p className='text-[13px]'>{music_styleItem.music_style}</p>
                      {index !== item.data.music_styles.length - 1 && 
                        <span className='mx-1 text-xs'>•</span>
                      }
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className='text-white flex tracking-wider gap-2'>
                <p className='md:text-3xl text-2xl'>{item.data.price}</p>
                <span className='self-end text-xl opacity-60'>kr.</span>
              </div>
            </div>
          </div>
          <Button field={item.data.button_link} className='text-[13px] w-[85px] h-[56px] border border-[#6a6a6a] hover:bg-[#303030] self-end'>
            Book
          </Button>
        </div>
      ))}
    </Bounded>
  );
};

export default Results;
