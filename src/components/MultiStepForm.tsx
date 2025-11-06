import { useCallback, useMemo, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { steps, defaultFormValues } from "./constant";
import { Stepper } from "./Stepper";
import { FamilyFinancialInfo } from "./steps/familyfinancialInfo/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalInfo } from "./steps/personalInfo/index";
import { SituationDescription } from "./steps/situationDescription/index";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { schemas, type FormDraft } from "./types";
import { useFormStore } from "@/store/formStore";
import { mockSubmitAPI } from "@/services/mockSubmitAPI";

export const MultiStepForm = () => {
    const { data, activeStep, setActiveStep, setBulk, reset: resetStore } = useFormStore();
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const methods = useForm<FormDraft>({
        resolver: zodResolver(schemas[activeStep]) as any,
        mode: "onChange",
        defaultValues: data,
    });

    // Sync react-hook-form changes to Zustand store
    useEffect(() => {
        const subscription = methods.watch((values) => setBulk(values as Partial<FormDraft>));
        return () => subscription.unsubscribe();
    }, [methods, setBulk]);

    const OnFormSubmit = useCallback(async () => {
        if (activeStep < 2) {
            setActiveStep(activeStep + 1);
        } else {
            try {
                await mockSubmitAPI(data);
                setShowSubmitModal(true);
            } catch (error) {
                console.error("Form submission failed:", error);
            }
        }
    }, [activeStep, setActiveStep]);

    const handleFormReset = useCallback(() => {
        setShowSubmitModal(false);
        resetStore();
        methods.reset(defaultFormValues as FormDraft);
        setActiveStep(0);
    }, [methods, resetStore, setActiveStep]);

    const handleBackBtnClick = useCallback(() => {
        setActiveStep(activeStep - 1);
    }, [activeStep, setActiveStep]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showSubmitModal) {
                handleFormReset();
            }
        };
        if (showSubmitModal) {
            document.addEventListener('keydown', handleEscape);
            // Trap focus in modal
            const modal = document.getElementById('submit-modal');
            modal?.focus();
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [showSubmitModal, handleFormReset]);

    const renderStep = useMemo(() => {
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
    }, [activeStep]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(OnFormSubmit)} className="flex flex-col justify-between h-full">
                <div>
                    {/* Stepper */}
                    <Stepper steps={steps} currentStep={activeStep} />

                    <p className="pb-4"><span className="text-red-500 pr-1.5">*</span>All fields must be filled to proceed</p>
                    <div className="overflow-auto">
                        {/* Step content */}
                        {renderStep}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className={cn("flex pt-4", activeStep === 0 ? "justify-end" : "justify-between")}>
                    {activeStep > 0 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleBackBtnClick}
                        >
                            Back
                        </Button>
                    )}
                    <Button type="submit">{activeStep === 2 ? "Submit" : "Next"}</Button>
                </div>
            </form>

            {showSubmitModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        id="submit-modal"
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4"
                        tabIndex={-1}
                    >
                        <h2 id="modal-title" className="text-xl font-semibold">Form Submitted</h2>
                        <p className="text-gray-700">Your form has been submitted successfully.</p>
                        <div className="flex justify-end">
                            <Button type="button" onClick={handleFormReset}>OK</Button>
                        </div>
                    </div>
                </div>
            )}
        </FormProvider>
    )
}
