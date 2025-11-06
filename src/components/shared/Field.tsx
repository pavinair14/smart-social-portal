import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { FieldProps } from "../steps/personalInfo/types";
import { useFormContext } from "react-hook-form";
import { cityMap } from "../steps/personalInfo/constants";
import { ErrorField } from "../steps/Error";


export const Field: React.FC<FieldProps> = ({
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
        if (!city) return;
        const key = Object.keys(cityMap).find((k) => k.toLowerCase() === city.toLowerCase());
        if (!key) return;

        const mapping = cityMap[key];
        // autofills the state or country fields if they are empty
        if (!stateVal) setValue("state", mapping.state, { shouldValidate: true, shouldDirty: true });
        if (!countryVal) setValue("country", mapping.country, { shouldValidate: true, shouldDirty: true });

    }, [city, setValue]);

    const base = "w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 focus:outline-none";

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
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={base}
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
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder}
                        className={`${base} resize-none h-20`}
                    />
                ) : (
                    <input
                        id={id}
                        type={type}
                        {...register}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder={placeholder}
                        className={base}
                    />
                )}

                <motion.div
                    animate={{ width: focused ? "100%" : "0%", opacity: focused ? 1 : 0 }}
                    transition={{ duration: 0.28 }}
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full ${error ? "bg-red-500" : "bg-gradient-to-r from-violet-600 to-teal-400"}`}
                />

                {error && (
                    <ErrorField error={error} />
                )}
            </div>
        </div >
    );
};
