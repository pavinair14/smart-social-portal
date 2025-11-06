import React, { useEffect, useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import type { FieldProps } from "../steps/personalInfo/types";
import { useFormContext } from "react-hook-form";
import { cityMap } from "../steps/personalInfo/constants";
import { ErrorField } from "./ErrorField";


export const Field: React.FC<FieldProps> = memo(({
    id,
    label,
    type = "text",
    placeholder,
    register,
    error,
    as = "input",
    options = [],
    fullWidth = false,
}) => {
    const [focused, setFocused] = useState(false);
    const { watch, setValue } = useFormContext();

    const city = watch("city");
    const stateVal = watch("state");
    const countryVal = watch("country");

    useEffect(() => {
        if (!city || id !== "city") return;
        const key = Object.keys(cityMap).find((k) => k.toLowerCase() === city.toLowerCase());
        if (!key) return;

        const mapping = cityMap[key];
        // autofills the state or country fields if they are empty
        if (!stateVal) setValue("state", mapping.state, { shouldValidate: true, shouldDirty: true });
        if (!countryVal) setValue("country", mapping.country, { shouldValidate: true, shouldDirty: true });

    }, [city, countryVal, id, setValue, stateVal]);

    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);

    const base = "w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 focus:outline-none autofill:bg-transparent autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] autofill:[-webkit-text-fill-color:rgb(31,41,55)]";
    const errorId = error ? `${id}-error` : undefined;

    return (
        <div className={`${fullWidth ? "sm:col-span-2" : ""} relative`}>
            <label htmlFor={id} className="block text-gray-600 text-base font-medium mb-1">
                {label}
            </label>

            <div className="relative">
                {as === "select" ? (
                    <select
                        id={id}
                        {...register}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={base}
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={errorId}
                    >
                        <option value="">Select</option>
                        {options.map((o) => (
                            <option key={o.value} value={o.value}>
                                {o.label}
                            </option>
                        ))}
                    </select>
                ) : as === "textarea" ? (
                    <textarea
                        id={id}
                        {...register}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        className={`${base} resize-none h-20`}
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={errorId}
                    />
                ) : (
                    <input
                        id={id}
                        type={type}
                        {...register}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        className={base}
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={errorId}
                    />
                )}

                <motion.div
                    animate={{ width: focused ? "100%" : "0%", opacity: focused ? 1 : 0 }}
                    transition={{ duration: 0.28 }}
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full ${error ? "bg-red-500" : "bg-gradient-to-r from-violet-600 to-teal-400"}`}
                />

                {error && (
                    <ErrorField error={error} fieldId={id} />
                )}
            </div>
        </div >
    );
});
