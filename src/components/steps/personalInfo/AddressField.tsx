// src/steps/PersonalInfo/AddressInfo.tsx
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { cityMap } from "./constants";
import { Field } from "../../shared/Field";
import { validationRules } from "./validationRules";

/**
 * AddressInfo:
 * - Address textarea (full row)
 * - City input -> attempts to autofill state/country only if those fields are empty
 * - State, Country inputs (editable)
 */
export const AddressInfo: React.FC = () => {
    const { register, watch, setValue } = useFormContext();
    const city = watch("city");
    const stateVal = watch("state");
    const countryVal = watch("country");

    useEffect(() => {
        if (!city) return;
        const key = Object.keys(cityMap).find((k) => k.toLowerCase() === city.toLowerCase());
        if (!key) return;

        const mapping = cityMap[key];
        // Only autofill if state/country are empty (user may have edited)
        if (!stateVal) setValue("state", mapping.state, { shouldValidate: true, shouldDirty: true });
        if (!countryVal) setValue("country", mapping.country, { shouldValidate: true, shouldDirty: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city, setValue]);

    return (
        <>
            <Field
                id="address"
                label="Address"
                as="textarea"
                register={register("address", validationRules.address)}
                error={null}
                fullWidth
                placeholder="Enter your full address"
            />

            <Field id="city" label="City" register={register("city")} error={null} />
            <Field id="state" label="State" register={register("state")} error={null} />
            <Field id="country" label="Country" register={register("country")} error={null} />
        </>
    );
};
