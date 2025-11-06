export const validationRules = {
    maritalStatus: {
        required: "Marital status is required",
    },
    dependents: {
        required: "Dependents count is required",
        min: { value: 0, message: "Dependents cannot be negative" },
        max: { value: 10, message: "Maximum 10 dependents allowed" },
    },
    employmentStatus: {
        required: "Employment status is required",
    },
    currency: {
        required: "Currency is required",
    },
    monthlyIncome: {
        required: "Monthly income is required",
        min: { value: 0, message: "Monthly income must be positive" },
    },
    housingStatus: {
        required: "Housing status is required",
    },
};
