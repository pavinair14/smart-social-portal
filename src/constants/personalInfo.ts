export const genderOptions = [
    { value: "male" },
    { value: "female" },
    { value: "other" },
] as const;

export const countryCodes = [
    { code: "+91", countryKey: "india", digits: 10 },
    { code: "+971", countryKey: "uae", digits: 9 },
    { code: "+1", countryKey: "usa", digits: 10 },
    { code: "+44", countryKey: "uk", digits: 10 },
] as const;

export const cityMap: Record<string, { stateKey: string; countryKey: string }> = {
    Chennai: { stateKey: "tamilNadu", countryKey: "india" },
    Bangalore: { stateKey: "karnataka", countryKey: "india" },
    Mumbai: { stateKey: "maharashtra", countryKey: "india" },
    Hyderabad: { stateKey: "telangana", countryKey: "india" },
    Dubai: { stateKey: "dubai", countryKey: "uae" },
    "Abu Dhabi": { stateKey: "abuDhabi", countryKey: "uae" },
    Sharjah: { stateKey: "sharjah", countryKey: "uae" },
    Ajman: { stateKey: "ajman", countryKey: "uae" },
};
