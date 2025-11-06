import { memo } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import type { StepperType } from "./types";

export const Stepper: React.FC<StepperType> = memo(({ steps, currentStep }) => (
    <div className="relative flex justify-between items-center w-full pb-6 pt-2">
        {steps.map((step: { title: string }, index: number) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isLast = index === steps.length - 1;

            return (
                <div key={index} className="relative flex flex-col items-center flex-1">
                    {/* Connector Line */}
                    {!isLast && (
                        <div className="absolute top-5 left-1/2 w-full h-[2px]">
                            <motion.div
                                className="h-[2px] bg-violet-900 origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: isCompleted ? 1 : 0,
                                }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            />
                            <div className="h-[2px] bg-gray-200 w-full absolute top-0 left-0 -z-10"></div>
                        </div>
                    )}

                    {/* Step Circle */}
                    <div
                        className={cn(
                            "flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all z-10",
                            isCompleted
                                ? "bg-violet-900 border-white text-white"
                                : isActive
                                    ? "bg-violet-900 border-violet-900 text-white relative"
                                    : "border-gray-300 bg-gray-100 text-gray-400"
                        )}
                    >
                        {isCompleted ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <span className="font-medium">{index + 1}</span>
                        )}
                        {isActive && (
                            <motion.span
                                className="absolute inset-0 rounded-full border-[3px] border-white animate-pulse"
                                layoutId="active-ring"
                            />
                        )}
                    </div>

                    {/* Step Title */}
                    <div className="mt-4 text-center">
                        <p className={cn(
                            "text-lg font-semibold",
                            isCompleted
                                ? "text-violet-900"
                                : isActive
                                    ? "text-violet-900"
                                    : "text-gray-700"
                        )}>
                            {step.title}
                        </p>
                    </div>
                </div>
            )
        })}
    </div>
));