import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import Bounded from '@/components/Bounded';
import Button from '@/components/Button';
import Heading from '@/components/Heading';

const components = {
  heading1: ({ children }) => (
    <Heading as="h1" size="xl" className="font-medium text-center bg-gradient-to-r from-purpleIsh to-greenIsh text-transparent bg-clip-text max-w-[900px]">{children}</Heading>
  ),
  paragraph: ({ children }) => (
    <p className='text-[13px] font-normal text-center tracking-widest text-white opacity-60 max-w-72 mt-[40px] leading-tight'>{children}</p>
  ),
}

/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @param {HeroProps} props
 */



const Hero = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className='flex flex-col items-center justify-center'>
        <PrismicRichText field={slice.primary.heading} components={components} />
        <PrismicRichText field={slice.primary.body} components={components} />
        <span className='bg-gradient-to-r	from-purpleIsh to-greenIsh rounded-full p-px mt-[18px] drop-shadow-[-4px_0.5px_5.5px_rgba(0,0,0,0.25)]'>
          <Button field={slice.primary.button_link} className='text-[15px] w-[110px] h-[58px]'>
            {slice.primary.button_text}
          </Button>
        </span>
      </div>
    </Bounded>
  );
};

export default Hero;
