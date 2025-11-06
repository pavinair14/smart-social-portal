export const validationRules = {
    currentFinancialSituation: {
        required: "Current financial situation is required",
        minLength: { value: 10, message: "Must be at least 10 characters" },
    },
    employmentCircumstances: {
        required: "Employment circumstances is required",
        minLength: { value: 10, message: "Must be at least 10 characters" },
    },
    reasonForApplying: {
        required: "Reason for applying is required",
        minLength: { value: 10, message: "Must be at least 10 characters" },
    },
};
