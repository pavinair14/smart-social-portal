import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../shared/Field";
import { ContactInfo } from "./ContactInfo";
import { genderOptions } from "./constants";
import type { FormField } from "./types";

export const PersonalInfo: React.FC = () => {
    const { register, formState: { errors } } = useFormContext();

    const formFieldMapping = useMemo(() => [
        { id: "name", label: "Name" },
        { id: "nationalId", label: "National ID" },
        { id: "dateOfBirth", label: "Date of Birth", type: "date" },
        {
            id: "gender",
            label: "Gender",
            as: "select",
            options: genderOptions.map((item) => ({ label: item.label, value: item.value })),
        },
        { id: 'address', label: 'Address', fullWidth: true },
        { id: "city", label: "City" },
        { id: "state", label: "State" },
        { id: "country", label: "Country" },
    ], []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">

            {formFieldMapping.map((fieldItem) => (
                <Field
                    key={fieldItem.id}
                    id={fieldItem.id}
                    label={fieldItem.label}
                    type={fieldItem.type}
                    as={fieldItem.as as FormField}
                    options={fieldItem.options}
                    fullWidth={fieldItem.fullWidth}
                    register={register(fieldItem.id)}
                    error={errors[fieldItem.id]?.message as string | undefined}
                />
            ))}

            <ContactInfo />

        </div>
    );
};