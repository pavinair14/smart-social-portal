export const validationRules = {
    name: {
        required: "Name is required",
        minLength: { value: 2, message: "Name must be at least 2 chars" },
    },
    nationalId: {
        required: "National ID is required",
        pattern: {
            value: /^[A-Za-z0-9\-]+$/,
            message: "National ID must be alphanumeric",
        },
    },
    dateOfBirth: {
        required: "Date of birth is required",
        validate: (v: string) => {
            if (!v) return "Date of birth is required";
            const selected = new Date(v);
            const now = new Date();
            return selected <= now || "Date of birth cannot be in the future";
        },
    },
    gender: { required: "Gender is required" },
    address: { required: "Address is required" },
    city: { required: "City is required" },
    state: { required: "State is required" },
    country: { required: "Country is required" },
    phoneCode: { required: "Code is required" },
    phone: {
        required: "Phone number is required",
        pattern: {
            value: /^[0-9]+$/,
            message: "Only digits allowed",
        },
    },
    email: {
        required: "Email is required",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
        },
    },
};
