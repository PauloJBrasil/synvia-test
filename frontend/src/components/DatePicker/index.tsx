import dayjs from "dayjs";
import { CalendarBlank } from "phosphor-react";
import { Controller, useFormContext } from "react-hook-form";

import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useHookFormError } from "../../hooks/useHookFormError";


function Calendar() {
    return <CalendarBlank size={20} color="#005191" />;
}

export function FormDatePicker({
    label,
    description,
    name,
    ...rest
}: any) {
    const {
        control,
        formState: { errors },
        setError,
        clearErrors,
    } = useFormContext();


    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="pt-br"
                >
                    <DesktopDatePicker
                        {...field}
                        {...rest}
                        label={label}
                        components={{
                            OpenPickerIcon: Calendar,
                        }}
                        format="DD/MM/YYYY"
                        onChange={(newValue: any) => {
                            if (!!newValue && !newValue?.isValid()) {
                                setError(name, { message: "Data inválida" });
                            } else {
                                clearErrors(name);
                            }
                            field.onChange(newValue?.format("YYYY-MM-DD") ?? null);
                        }}
                        value={!!field.value ? field.value : null}
                    />
                </LocalizationProvider>
            )}
        />
    );
}
