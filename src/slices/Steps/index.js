import Bounded from "@/components/Bounded";
import StepsMenu from "@/components/StepsMenu";
import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";

/**
 * @typedef {import("@prismicio/client").Content.StepsSlice} StepsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StepsSlice>} StepsProps
 * @param {StepsProps}
 */

// Define Steps component asynchronously
const Steps = async ({ slice }) => {
  // Create Prismic client instance
  const client = createClient();

  // Fetch step data from Prismic CMS
  const steps = await Promise.all(
    slice.items.map((item) => {
      // Check if step item exists and has a UID
      if (isFilled.contentRelationship(item.step) && item.step.uid) {
        // Retrieve step data by UID from Prismic
        return client.getByUID("step", item.step.uid, {
          // Fetch additional linked data for filter buttons
          fetchLinks: ["filter_button.value", "filter_button.description"],
        });
      }
    })
  );

  // Return Steps component with fetched data
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="steps"
      className="lg:h-svh flex relative"
    >
      <div className="relative lg:h-[711px] my-auto py-6 w-full">
        <div className="flex flex-col justify-between h-full gap-20">
          {/* Render StepsMenu component with fetched steps data */}
          <StepsMenu steps={steps} />
        </div>
      </div>
      {/* Render vertical separator for desktop view */}
      <div className="absolute right-0 h-[711px] top-1/2 transform -translate-y-1/2 w-px bg-[#464646] hidden lg:block"></div>
      {/* Render horizontal separator for mobile view */}
      <div className="absolute bottom-0 h-px left-1/2 transform -translate-x-1/2 w-full bg-[#464646] block lg:hidden"></div>
    </Bounded>
  );
};

export default Steps;
