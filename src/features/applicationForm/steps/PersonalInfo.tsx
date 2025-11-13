import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Field } from "../common/Field";
import { useMemo } from "react";
import { countryCodes, genderOptions, countryOptions, stateOptions, cityOptions } from "@/constants/personalInfo";
import type { FormField } from "@/types/formField";



const PersonalInfo: React.FC = () => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext();
    const { t } = useTranslation();

    const selectedCountry = watch("country");
    const selectedState = watch("state");
    const selectedCity = watch("city");

    const countryCodeOptions = useMemo(() =>
        countryCodes.map((c) => ({ label: `${t(`geo.countries.${c.countryKey}`)} (${c.code})`, value: c.code })),
        [t]
    );

    const countrySelectOptions = useMemo(() =>
        countryOptions.map((c) => ({ label: t(`geo.countries.${c.value}`), value: c.value })),
        [t]
    );

    const stateSelectOptions = useMemo(() => {
        const filteredStates = stateOptions.filter((s) => !selectedCountry || s.countryKey === selectedCountry);

        // If current state value exists but not in filtered list, include it
        if (selectedState && !filteredStates.find((s) => s.value === selectedState)) {
            const currentState = stateOptions.find((s) => s.value === selectedState);
            if (currentState) filteredStates.push(currentState);
        }

        return filteredStates.map((s) => ({ label: t(`geo.states.${s.value}`), value: s.value }));
    }, [selectedCountry, selectedState, t]);

    const citySelectOptions = useMemo(() => {
        const filteredCities = cityOptions.filter((c) => !selectedCountry || c.countryKey === selectedCountry);

        // If current city value exists but not in filtered list, include it
        if (selectedCity && !filteredCities.find((c) => c.value === selectedCity)) {
            const currentCity = cityOptions.find((c) => c.value === selectedCity);
            if (currentCity) filteredCities.push(currentCity);
        }

        return filteredCities.map((c) => ({ label: t(`geo.cities.${c.value}`), value: c.value }));
    }, [selectedCountry, selectedCity, t]);

    const fields = [
        { id: "name", label: t('fields.name') },
        { id: "nationalId", label: t('fields.nationalId') },
        { id: "dateOfBirth", label: t('fields.dateOfBirth'), type: "date" },
        {
            id: "gender",
            label: t('fields.gender'),
            as: "select",
            options: genderOptions.map((item) => ({
                label: t(`options.${item.value}`),
                value: item.value
            })),
        },
        { id: "address", label: t('fields.address'), fullWidth: true },
        {
            id: "country",
            label: t('fields.country'),
            as: "select",
            options: countrySelectOptions,
        },
        {
            id: "state",
            label: t('fields.state'),
            as: "select",
            options: stateSelectOptions,
        },
        {
            id: "city",
            label: t('fields.city'),
            as: "select",
            options: citySelectOptions,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {fields.map(({ id, label, type, as, options, fullWidth }) => (
                <Field
                    key={id}
                    id={id}
                    label={label}
                    type={type}
                    as={as as FormField}
                    options={options}
                    fullWidth={fullWidth}
                    register={register(id)}
                    error={errors[id]?.message as string | undefined}
                />
            ))}
            <Field
                id="email"
                label={t('fields.email')}
                type="email"
                register={register("email")}
                error={errors.email?.message as string | undefined}
            />

            <div className="sm:col-span-1 flex gap-4">
                <div className="w-1/3">
                    <Field
                        id="phoneCode"
                        label={t('fields.code')}
                        as="select"
                        register={register("phCode")}
                        options={countryCodeOptions}
                        error={errors.phCode?.message as string | undefined}
                    />
                </div>

                <div className="flex-1">
                    <Field
                        id="phone"
                        label={t('fields.phone')}
                        type="tel"
                        register={register("phone")}
                        error={errors.phone?.message as string | undefined}

                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
