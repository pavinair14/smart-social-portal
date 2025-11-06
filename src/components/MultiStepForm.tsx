import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form";
import { steps } from "./constant";
import { Stepper } from "./Stepper";
import { FamilyFinancialInfo } from "./steps/familyfinancialInfo/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfo } from "./steps/personalInfo/index";
import { SituationDescription } from "./steps/situationDescription/index";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { schemas, type FormData } from "./types";

export const MultiStepForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm<FormData>({
        resolver: zodResolver(schemas[activeStep]),
        mode: "onBlur"
    });

    const OnFormSubmit = () => {
        if (activeStep < 2) {
            setActiveStep(activeStep + 1);
        } else {
            console.log("Final submission:", activeStep);
            alert("Form submitted successfully!");
        }
    }

    const renderStep = () => {
        switch (activeStep) {
            case 0:
                return <PersonalInfo />;
            case 1:
                return <FamilyFinancialInfo />;
            case 2:
                return <SituationDescription />;
            default:
                return null;
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(OnFormSubmit)} className="flex flex-col justify-between h-full">
                <div>
                    {/* Stepper */}
                    <Stepper steps={steps} currentStep={activeStep} />

                    <p className="pb-4"><span className="text-red-500 pr-1.5">*</span>All fields must be filled to proceed</p>
                    <div className="overflow-auto">
                        {/* Step content */}
                        {renderStep()}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className={cn("flex pt-4", activeStep === 0 ? "justify-end" : "justify-between")}>
                    {activeStep > 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setActiveStep(activeStep - 1)}
                        >
                            Back
                        </Button>
                    )}
                    <Button type="submit">{activeStep === 2 ? "Submit" : "Next"}</Button>
                </div>
            </form>
        </FormProvider>
    )
}
