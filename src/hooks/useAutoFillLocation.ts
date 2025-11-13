import { cityMap } from "@/constants/personalInfo";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";



//  Automatically fills state and country based on city input.
//   Clears state and country when city is not recognized.
export const useAutoFillLocation = () => {
    const { watch, setValue } = useFormContext();
    const { t } = useTranslation();

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name !== "city") return;

            const cityValue = value.city?.trim() || "";
            const key = Object.keys(cityMap).find(
                (k) => k.toLowerCase() === cityValue.toLowerCase()
            );

            if (key) {
                const { stateKey, countryKey } = cityMap[key];
                setValue("state", t(`geo.states.${stateKey}`), { shouldValidate: true, shouldDirty: true });
                setValue("country", t(`geo.countries.${countryKey}`), { shouldValidate: true, shouldDirty: true });
            } else {
                // Clear fields if the city isn't in the map
                setValue("state", "", { shouldValidate: true, shouldDirty: true });
                setValue("country", "", { shouldValidate: true, shouldDirty: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, setValue]);
};
