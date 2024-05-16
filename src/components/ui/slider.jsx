"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-px w-full grow overflow-hidden rounded-full bg-[#666666]">
      <SliderPrimitive.Range className="absolute h-full bg-[#666666]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="cursor-pointer block h-5 w-5 rounded-full bg-[#c3c3c3] drop-shadow-[-3px_0.5px_6px_rgba(0,0,0,0.1)] hover:bg-white transition-colors duration-200 ease-in-out" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
