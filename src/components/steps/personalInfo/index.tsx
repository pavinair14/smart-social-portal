import React from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../shared/Field";
import { ContactInfo } from "./ContactInfo";
import { genderOptions } from "./constants";
import { validationRules } from "./validationRules";
import type { FormField } from "./types";

export const PersonalInfo: React.FC = () => {
    const { register, formState: { errors } } = useFormContext();

    const formFieldMapping = [
        { id: "name", label: "Name", validation: validationRules.name },
        { id: "nationalId", label: "National ID", validation: validationRules.nationalId },
        { id: "dateOfBirth", label: "Date of Birth", type: "date", validation: validationRules.dateOfBirth },
        {
            id: "gender",
            label: "Gender",
            as: "select",
            options: genderOptions.map((item) => ({ label: item.label, value: item.value })),
            validation: validationRules.gender,
        },
        { id: 'address', label: 'Address', validation: validationRules.address, fullWidth: true },
        { id: "city", label: "City", validation: validationRules.city },
        { id: "state", label: "State", validation: validationRules.state },
        { id: "country", label: "Country", validation: validationRules.country },
    ];

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
                    register={register(fieldItem.id, fieldItem.validation)}
                    error={errors[fieldItem.id]?.message as string | undefined}
                />
            ))}

            <ContactInfo />

        </div>
    );
};