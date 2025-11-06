import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "../../shared/Field";
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

    const maritalStatusOpts = useMemo(() =>
        maritalStatusOptions.map((m) => ({ label: m.label, value: m.value })),
        []
    );

    const employmentStatusOpts = useMemo(() =>
        employmentStatusOptions.map((e) => ({ label: e.label, value: e.value })),
        []
    );

    const currencyOpts = useMemo(() =>
        currencies.map((c) => ({ label: c.label, value: c.code })),
        []
    );

    return (

        <div className="grid grid-cols-2 gap-x-12 gap-y-6">

            {/* Marital Status */}
            <Field
                id="maritalStatus"
                label="Marital Status"
                as="select"
                register={register("maritalStatus")}
                options={maritalStatusOpts}
                error={errors.maritalStatus?.message as string | undefined}
            />
            {/* Dependents */}
            <Field
                id="dependents"
                label="Dependents"
                type="number"
                register={register("dependents")}
                error={errors.dependents?.message as string}
                placeholder="Enter number of dependents"
            />

            {/* Employment Status */}
            <Field
                id="employmentStatus"
                label="Employment Status"
                as="select"
                register={register("employmentStatus")}
                options={employmentStatusOpts}
                error={errors.employmentStatus?.message as string | undefined}
            />

            {/* Housing Status */}
            <Field
                id="housingStatus"
                label="Housing Status"
                register={register("housingStatus")}
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
                        register={register("currency")}
                        options={currencyOpts}
                        error={errors.currency?.message as string | undefined}
                    />
                </div>

                <div className="flex-1">
                    <Field
                        id="monthlyIncome"
                        label="Monthly Income"
                        type="number"
                        register={register("monthlyIncome")}
                        error={errors.monthlyIncome?.message as string | undefined}
                    />
                </div>
            </div>
        </div>

    );
};
