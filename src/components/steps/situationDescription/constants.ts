import { validationRules } from "./validationRules";

export const descriptionFields = [
    { id: "currentFinancialSituation", label: "Current Financial Situation", validation: validationRules.currentFinancialSituation },
    { id: "employmentCircumstances", label: "Employment Circumstances", validation: validationRules.employmentCircumstances },
    { id: "reasonForApplying", label: "Reason for Applying", validation: validationRules.reasonForApplying },
];