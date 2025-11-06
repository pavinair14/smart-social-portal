import type z from "zod";
import { FamilyFinancialInfoSchema, personalInfoSchema, SituationDescriptionSchema } from "./schems";


export const schemas = [personalInfoSchema, FamilyFinancialInfoSchema, SituationDescriptionSchema];

export type FormData = z.infer<typeof schemas[number]>;

export type StepperType = {
    steps: { title: string }[],
    currentStep: number
}