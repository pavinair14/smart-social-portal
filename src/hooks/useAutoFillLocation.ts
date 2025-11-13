import { cityOptions, stateOptions } from "@/constants/personalInfo";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";



//  Automatically handles cascading location field updates
export const useAutoFillLocation = () => {
    const { watch, setValue, getValues } = useFormContext();
    const lastChangeRef = useRef<{ field: string; value: string }>({ field: "", value: "" });

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (!name || !["city", "state", "country"].includes(name)) return;

            const currentValue = value[name]?.trim() || "";

            // Prevent infinite loops by checking if this is a programmatic update we just made
            if (lastChangeRef.current.field === name && lastChangeRef.current.value === currentValue) {
                return;
            }

            lastChangeRef.current = { field: name, value: currentValue };

            // Rule 1: When city is selected, auto-fill country and state
            if (name === "city" && currentValue) {
                const selectedCity = cityOptions.find((c) => c.value === currentValue);
                if (selectedCity) {
                    const { stateKey, countryKey } = selectedCity;
                    setValue("state", stateKey, { shouldValidate: true, shouldDirty: true });
                    setValue("country", countryKey, { shouldValidate: true, shouldDirty: true });
                }
            }

            // Rule 2: When state is selected manually, auto-fill country and validate city
            if (name === "state" && currentValue) {
                const selectedState = stateOptions.find((s) => s.value === currentValue);
                if (selectedState) {
                    const { countryKey } = selectedState;
                    const currentCountry = getValues("country");

                    // Update country if it doesn't match
                    if (currentCountry !== countryKey) {
                        setValue("country", countryKey, { shouldValidate: true, shouldDirty: true });
                    }

                    // Always check city validity when state is selected
                    const currentCity = getValues("city");
                    if (currentCity) {
                        const cityData = cityOptions.find((c) => c.value === currentCity);
                        // Clear city if it doesn't belong to this state
                        if (!cityData || cityData.stateKey !== currentValue) {
                            setValue("city", "", { shouldValidate: true, shouldDirty: true });
                        }
                    }
                }
            }

            // Rule 3: When country is selected manually, clear state and city if they don't match
            if (name === "country" && currentValue) {
                const currentState = getValues("state");
                const currentCity = getValues("city");

                // Check if current state belongs to selected country
                if (currentState) {
                    const stateData = stateOptions.find((s) => s.value === currentState);
                    if (stateData && stateData.countryKey !== currentValue) {
                        setValue("state", "", { shouldValidate: true, shouldDirty: true });
                    }
                }

                // Check if current city belongs to selected country
                if (currentCity) {
                    const cityData = cityOptions.find((c) => c.value === currentCity);
                    if (cityData && cityData.countryKey !== currentValue) {
                        setValue("city", "", { shouldValidate: true, shouldDirty: true });
                    }
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue, getValues]);
};
