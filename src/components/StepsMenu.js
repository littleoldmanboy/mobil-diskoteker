"use client";

import { useChoiceStore } from "@/store";
import { PrismicRichText } from "@prismicio/react";
import { Fragment, useEffect, useState } from "react";
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

const components = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="tracking-widest text-white">
      {children}
    </Heading>
  ),
};

export default function StepsMenu({ steps }) {
  const activeStep = useStore(useChoiceStore, (state) => state.activeStep);
  const setActiveStep = useChoiceStore((state) => state.setActiveStep);
  const choices = useStore(useChoiceStore, (state) => state.choices);
  const setChoice = useChoiceStore((state) => state.setChoice);
  const resetChoices = useChoiceStore((state) => state.resetChoices);
  const [price, setPrice] = useState([10000]);

  const handleChoice = (step, value) => {
    if (choices[step + 1] === value) {
      setChoice(step + 1, null);
      return;
    }
    setChoice(step + 1, value);
  };

  const nextStep = (step) => {
    setActiveStep(step + 1);
  };

  useEffect(() => {
    setPrice([choices?.[3] || 10000]);
  }, [choices]);

  if (!choices) {
    return <div className="text-[#e7e7e7] tracking-wider">Indlæser...</div>;
  }

  return (
    <>
      <div>
        <div className="flex flex-col gap-7 text-[#c8c8c8] tracking-wider">
          {steps.map((step, index) => {
            const chosenStep = choices?.[index + 1];

            if (activeStep <= index) return null;
            return (
              <div key={index} className="relative flex justify-between">
                <button
                  className="hover:text-white transition-colors duration-200 ease-in-out"
                  key={index}
                  onClick={() => {
                    setActiveStep(index);
                    for (let i = index + 1; i <= steps.length; i++) {
                      setChoice(i, null);
                    }
                  }}
                >
                  {step.data.type}
                </button>
                <div>
                  {chosenStep}
                  {index === 2 && " kr."}
                </div>
                <div className="absolute w-full h-px bg-[#666666] -bottom-3"></div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-8 mt-20">
          {steps.map((step, index) => {
            if (index !== activeStep) return null;

            return (
              <Fragment key={index}>
                <div
                  onClick={() => {
                    setActiveStep(index);
                  }}
                >
                  <PrismicRichText
                    components={components}
                    field={step.data.question}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  {index === 2 && activeStep === 2 ? (
                    <div className="mt-2 flex flex-col w-full gap-7">
                      <h3 className="text-white text-[13px] tracking-wider">
                        {price[0] || 10000} kr.
                      </h3>
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
                    step.data.filter_buttons.map((filter_buttonItem, i) => {
                      const isChosen =
                        choices[index + 1] ===
                        filter_buttonItem.filter_button.data?.value;

                      return (
                        <div
                          key={i}
                          className={cn(
                            isChosen
                              ? "bg-gradient-to-r	from-purpleIsh to-greenIsh rounded-full p-px drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.25)]"
                              : "p-px relative w-fit drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)]"
                          )}
                        >
                          <Filter
                            isChosen={isChosen}
                            onClick={() => {
                              handleChoice(
                                index,
                                filter_buttonItem.filter_button.data?.value
                              );
                            }}
                          >
                            {filter_buttonItem.filter_button.data?.value}
                          </Filter>

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
                </div>
                {((index !== steps.length - 1 && choices[index + 1]) ||
                  index === 2) && (
                  <button
                    className="my-3 py-[15px] px-[17px] w-fit text-[12px] font-normal text-white flex tracking-wider justify-center items-center rounded-full transition-all duration-200 ease-in-out border border-[#6a6a6a] hover:bg-[#2d2e2f] bg-darkGray drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)]"
                    onClick={() => {
                      if (index === 2) {
                        setChoice(3, price[0]);
                      }
                      nextStep(index);
                    }}
                  >
                    Videre
                  </button>
                )}
                {index === steps.length - 1 && choices[index + 1] && (
                  <div
                    onClick={() => {
                      setActiveStep(5);
                    }}
                  >
                    Afslut allan
                  </div>
                )}
              </Fragment>
            );
          })}
          {activeStep === 5 && (
            <div>
              Du er færdig keld
              <button
                onClick={() => {
                  setActiveStep(0);
                  resetChoices();
                }}
              >
                Nulstil
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {steps.map((step, index) => {
          if (activeStep > index) return null;
          return (
            <p
              key={index}
              className={cn(
                activeStep === index ? "text-white" : "text-[#7a7a7a]",
                "text-xl tracking-wider text-start"
              )}
            >
              {step.data.type}
            </p>
          );
        })}
      </div>
    </>
  );
}
