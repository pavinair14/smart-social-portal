import type z from "zod";
import { FamilyFinancialInfoSchema, personalInfoSchema, SituationDescriptionSchema } from "./schemas";

export const schemas = [personalInfoSchema, FamilyFinancialInfoSchema, SituationDescriptionSchema];

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type FamilyFinancialInfoData = z.infer<typeof FamilyFinancialInfoSchema>;
export type SituationDescriptionData = z.infer<typeof SituationDescriptionSchema>;

export type FormData = PersonalInfoData & FamilyFinancialInfoData & SituationDescriptionData;

export type StepperType = {
    steps: { title: string }[],
    currentStep: number
}