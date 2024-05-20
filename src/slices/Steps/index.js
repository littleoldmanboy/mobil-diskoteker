import Bounded from "@/components/Bounded";
import StepsMenu from "@/components/StepsMenu";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";

/**
 * @typedef {import("@prismicio/client").Content.StepsSlice} StepsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StepsSlice>} StepsProps
 * @param {StepsProps}
 */

const Steps = async ({ slice }) => {
  const client = createClient();

  const steps = await Promise.all(
    slice.items.map((item) => {
      if (isFilled.contentRelationship(item.step) && item.step.uid) {
        return client.getByUID("step", item.step.uid, {
          fetchLinks: ["filter_button.value", "filter_button.description"],
        });
      }
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="steps"
      className="lg:h-svh flex relative"
    >
      <div className="relative lg:h-[711px] my-auto py-6 w-full">
        <div className="flex flex-col justify-between h-full gap-20">
          <StepsMenu steps={steps} />
        </div>
      </div>
      <div className="absolute right-0 h-[711px] top-1/2 transform -translate-y-1/2 w-px bg-[#464646] hidden lg:block"></div>
      <div className="absolute bottom-0 h-px left-1/2 transform -translate-x-1/2 w-full bg-[#464646] block lg:hidden"></div>
    </Bounded>
  );
};

export default Steps;
