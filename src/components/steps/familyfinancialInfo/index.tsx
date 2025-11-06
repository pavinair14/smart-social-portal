import React from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../shared/Field";
import { validationRules } from "./validationRules";
import {
    maritalStatusOptions,
    employmentStatusOptions,
    currencies,
} from "./constants";

export const FamilyFinancialInfo: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (

        <div className="grid grid-cols-2 gap-x-12 gap-y-6">

            {/* Marital Status */}
            <Field
                id="maritalStatus"
                label="Marital Status"
                as="select"
                register={register("maritalStatus", validationRules.maritalStatus)}
                options={maritalStatusOptions.map((m) => ({ label: m.label, value: m.value }))}
                error={errors.maritalStatus?.message as string | undefined}
            />
            {/* Dependents */}
            <Field
                id="dependents"
                label="Dependents"
                type="number"
                register={register("dependents", validationRules.dependents)}
                error={errors.dependents?.message as string}
                placeholder="Enter number of dependents"
            />

            {/* Employment Status */}
            <Field
                id="employmentStatus"
                label="Employment Status"
                as="select"
                register={register("employmentStatus", validationRules.employmentStatus)}
                options={employmentStatusOptions.map((e) => ({ label: e.label, value: e.value }))}
                error={errors.employmentStatus?.message as string | undefined}
            />

            {/* Housing Status */}
            <Field
                id="housingStatus"
                label="Housing Status"
                register={register("housingStatus", validationRules.housingStatus)}
                error={errors.housingStatus?.message as string}
                placeholder="Enter your housing status"
            />

            {/* Monthly Income (Currency + Input) */}
            <div className="sm:col-span-1 flex gap-4">
                <div className="w-1/3">
                    <Field
                        id="currency"
                        label="Currency"
                        as="select"
                        register={register("currency", validationRules.currency)}
                        options={currencies.map((c) => ({ label: c.label, value: c.code }))}
                        error={errors.currency?.message as string | undefined}
                    />
                </div>

                <div className="flex-1">
                    <Field
                        id="monthlyIncome"
                        label="Monthly Income"
                        type="number"
                        register={register("monthlyIncome", validationRules.monthlyIncome)}
                        error={errors.monthlyIncome?.message as string | undefined}
                    />
                </div>
            </div>
        </div>

    );
};
