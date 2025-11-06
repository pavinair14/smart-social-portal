// src/steps/PersonalInfo/ContactInfo.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../shared/Field";
import { countryCodes } from "./constants";
import { validationRules } from "./validationRules";

export const ContactInfo: React.FC = () => {
    const { register, watch, formState: { errors } } = useFormContext();
    const phoneCode = watch("phoneCode");

    // helper: get allowed digits for selected code
    const digitsForCode = (code?: string) => {
        const found = countryCodes.find((c) => c.code === code);
        return found ? found.digits : undefined;
    };

    // we will register phone with a validate function that checks length dynamically
    const phoneValidation = {
        ...validationRules.phone,
        validate: (val: string) => {
            if (!val) return "Phone number is required";
            if (!/^\d+$/.test(val)) return "Only digits allowed";
            const digits = digitsForCode(phoneCode);
            if (digits && val.length !== digits) return `Phone must be ${digits} digits for ${phoneCode}`;
            return true;
        },
    };

    return (
        <>
            <Field
                id="email"
                label="Email"
                type="email"
                register={register("email", validationRules.email)}
                error={errors.email?.message as string | undefined}
            />

            <div className="sm:col-span-1 flex gap-4">
                <div className="w-1/3">
                    <Field
                        id="phoneCode"
                        label="Code"
                        as="select"
                        register={register("phCode", validationRules.phoneCode)}
                        options={countryCodes.map((c) => ({ label: `${c.label} (${c.code})`, value: c.code }))}
                        error={errors.phCode?.message as string | undefined}
                    />
                </div>

                <div className="flex-1">
                    <Field
                        id="phone"
                        label="Phone"
                        type="tel"
                        register={register("phone", phoneValidation)}
                        error={errors.phone?.message as string | undefined}

                    />
                </div>
            </div>
        </>
    );
};
