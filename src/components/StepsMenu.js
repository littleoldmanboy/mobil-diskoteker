"use client";

import { useChoiceStore } from "@/store";
import { PrismicRichText } from "@prismicio/react";
import { Fragment, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Filter from "./Filter";
import Heading from "./Heading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Slider } from "./ui/slider";
import useStore from "@/store/useStore";
import { cn } from "@/lib/utils";

// Custom components for Prismic Rich Text rendering
const components = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="tracking-widest text-white">
      {children}
    </Heading>
  ),
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const widthExpand = {
  hidden: { width: 0 },
  visible: { width: "100%" },
  exit: { width: 0 },
};

// Initialize state outside the component to ensure consistency across renders
let completedStepsHeight = null;

// StepsMenu component definition
export default function StepsMenu({ steps }) {
  const activeStep = useStore(useChoiceStore, (state) => state.activeStep);
  const setActiveStep = useChoiceStore((state) => state.setActiveStep);
  const choices = useStore(useChoiceStore, (state) => state.choices);
  const setChoice = useChoiceStore((state) => state.setChoice);
  const resetChoices = useChoiceStore((state) => state.resetChoices);
  const [price, setPrice] = useState([10000]);

  // Function to handle user choices
  const handleChoice = (step, value) => {
    if (choices[step + 1] === value) {
      setChoice(step + 1, null);
      return;
    }
    setChoice(step + 1, value);
  };

  // Function to proceed to the next step
  const nextStep = (step) => {
    setActiveStep(step + 1);
  };

  // Effect to update price state based on choices
  useEffect(() => {
    setPrice([choices?.[3] || 10000]);
  }, [choices]);

  // Ref to reference completed steps div
  const completedStepsRef = useRef(null);

  // Effect to update completed steps height after component mounts
  useEffect(() => {
    if (completedStepsRef.current) {
      completedStepsHeight = completedStepsRef.current.offsetHeight;
    }
  }, []);

  // Render loading state if choices are not yet loaded
  if (!choices) {
    return <div className="text-[#e7e7e7] tracking-wider">Indlæser...</div>;
  }

  // Render StepsMenu component
  return (
    <>
      <div>
        <div>
          {/* Render list of completed steps */}
          <AnimatePresence>
            <div
              className="flex flex-col gap-7 text-[#c8c8c8] tracking-wider"
              style={{ height: completedStepsHeight }}
              ref={completedStepsRef}
            >
              {steps.map((step, index) => {
                const chosenStep = choices?.[index + 1];

                // Exclude incomplete steps from rendering
                if (activeStep <= index) return null;
                return (
                  <motion.div
                    key={index}
                    className="relative flex justify-between"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Render button for each completed step */}
                    <button
                      className="hover:text-white transition-colors duration-200 ease-in-out"
                      key={index}
                      onClick={() => {
                        // Set active step on button click
                        setActiveStep(index);
                        // Reset choices for steps after the selected step
                        for (let i = index + 1; i <= steps.length; i++) {
                          setChoice(i, null);
                        }
                      }}
                    >
                      {/* Render step type */}
                      {step.data.type}
                    </button>
                    {/* Render chosen step information */}
                    <div>
                      {chosenStep}
                      {/* Append currency symbol for price step */}
                      {index === 2 && " kr."}
                    </div>
                    {/* Render horizontal separator */}
                    <motion.div
                      className="absolute h-px bg-[#666666] -bottom-3"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={widthExpand}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>

        {/* Render current step content and filter buttons */}
        <div className="flex flex-col gap-8 mt-20">
          {steps.map((step, index) => {
            // Skip rendering if step is not active
            if (index !== activeStep) return null;

            return (
              <Fragment key={index}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    // Set active step on content click
                    setActiveStep(index);
                  }}
                >
                  {/* Render Prismic rich text component */}
                  <PrismicRichText
                    components={components}
                    field={step.data.question}
                  />
                </motion.div>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeInUp}
                  transition={{ duration: 0.5 }}
                >
                  {/* Render filter buttons for each step */}
                  {index === 2 && activeStep === 2 ? (
                    // Render slider for price step
                    <div className="mt-2 flex flex-col w-full gap-7">
                      <h3 className="text-white text-[13px] tracking-wider">
                        {/* Render current price */}
                        {price[0] || 10000} kr.
                      </h3>
                      {/* Render slider component */}
                      <Slider
                        min={2500}
                        max={10000}
                        value={price}
                        onValueChange={(v) => {
                          setPrice(v);
                        }}
                      />
                    </div>
                  ) : (
                    // Render filter buttons for other steps
                    step.data.filter_buttons.map((filter_buttonItem, i) => {
                      const isChosen =
                        choices[index + 1] ===
                        filter_buttonItem.filter_button.data?.value;

                      return (
                        <div
                          key={i}
                          className={cn(
                            // Apply styles based on whether filter is chosen
                            isChosen
                              ? "bg-gradient-to-r	from-purpleIsh to-greenIsh rounded-full p-px drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.25)]"
                              : "p-px relative w-fit drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)]"
                          )}
                        >
                          {/* Render filter component */}
                          <Filter
                            isChosen={isChosen}
                            onClick={() => {
                              // Handle filter selection
                              handleChoice(
                                index,
                                filter_buttonItem.filter_button.data?.value
                              );
                            }}
                          >
                            {/* Render filter button value */}
                            {filter_buttonItem.filter_button.data?.value}
                          </Filter>

                          {/* Render tooltip component */}
                          <TooltipProvider delayDuration={250}>
                            <Tooltip>
                              <TooltipTrigger className="hidden md:block absolute top-[-6px] right-0 bg-darkGray h-5 w-5 text-[13px] font-normal text-[#a7a7a7] rounded-full transition-colors duration-200 ease-in-out border border-[#6a6a6a] hover:bg-[#2d2e2f] hover:text-white">
                                i
                              </TooltipTrigger>
                              <TooltipContent className="text-center bg-[#262729] py-3 px-4 mt-2 rounded-xl text-[#e7e7e7] text-[13px] font-normal tracking-wider">
                                {
                                  filter_buttonItem.filter_button.data
                                    ?.description
                                }
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      );
                    })
                  )}
                </motion.div>

                {/* Render "Videre" button if not on the last step or if a choice is made for the current step */}
                <AnimatePresence>
                  {((index !== steps.length - 1 && choices[index + 1]) ||
                    index === 2) && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeInUp}
                      transition={{ duration: 0.5 }}
                    >
                      <button
                        className="my-3 py-[15px] px-[17px] w-fit text-[12px] font-normal text-white flex tracking-wider justify-center items-center rounded-full transition-all duration-200 ease-in-out border border-[#6a6a6a] hover:bg-[#2d2e2f] bg-darkGray drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)]"
                        onClick={() => {
                          // If on the price step, set choice and proceed to the next step
                          if (index === 2) {
                            setChoice(3, price[0]);
                          }
                          // Proceed to the next step
                          nextStep(index);
                        }}
                      >
                        Videre
                      </button>
                    </motion.div>
                  )}
                  {/* Render "Færdig" button if on the last step and a choice is made for the last step */}
                  {index === steps.length - 1 && choices[index + 1] && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={fadeInUp}
                      transition={{ duration: 0.5 }}
                    >
                      <button
                        className="my-3 py-[15px] px-[17px] w-fit text-[12px] font-normal text-white flex tracking-wider justify-center items-center rounded-full transition-all duration-200 ease-in-out border border-[#6a6a6a] hover:bg-[#2d2e2f] bg-darkGray drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)]"
                        onClick={() => {
                          // Set active step to 5 when "Færdig" button is clicked
                          setActiveStep(5);
                        }}
                      >
                        Færdig
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Fragment>
            );
          })}

          {/* Render reset button and completion message if activeStep is 5 */}
          {activeStep === 5 && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              {/* Reset button */}
              <button
                className="my-3 py-[15px] px-[17px] w-fit text-[12px] font-normal text-white flex tracking-wider justify-center items-center rounded-full transition-all duration-200 ease-in-out border border-[#6a6a6a] hover:bg-[#2d2e2f] bg-darkGray drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)]"
                onClick={() => {
                  // Set active step to 0 and reset choices when reset button is clicked
                  setActiveStep(0);
                  resetChoices();
                }}
              >
                Nulstil
              </button>
              {/* Completion message */}
              <div className="flex flex-col gap-4 mt-16 mx-auto text-white text-[13px] tracking-wider opacity-75 leading-5 text-center max-w-[444px]">
                <p>Du har nu gennemført stepguiden.</p>
                <p>
                  Hvis du vil starte forfra og prøve andre valg, kan du
                  nulstille dine filtre ved at trykke på knappen ovenover.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Render list of steps */}
      <div className="flex flex-col gap-5">
        <AnimatePresence>
          {steps.map((step, index) => {
            // Skip rendering steps that are after the active step
            if (activeStep > index) return null;
            return (
              <motion.p
                key={index}
                className={cn(
                  // Apply different text color based on whether step is active or not
                  activeStep === index ? "text-white" : "text-[#7a7a7a]",
                  "text-xl tracking-wider text-start"
                )}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                {/* Display step type */}
                {step.data.type}
              </motion.p>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
