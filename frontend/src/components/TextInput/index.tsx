import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useHookFormError } from "../../hooks/useHookFormError";
import { useId } from "react";

type TextInputProps = TextFieldProps & {
    regEx?: string;
    name: string;
    label: string;
    description?: string;
    maxW?: string;
    minW?: string;
    onChangeValue?: (value: string) => void;
    sx?: any;
    maxLength?: number;
};

const TextInput = ({
    name,
    label,
    description,
    onChangeValue,
    minW,
    maxW,
    maxLength,
    ...rest
}: TextInputProps) => {

    const {
        control,
        formState: { errors },
    } = useFormContext();
    const { errorMessage, hasError } = useHookFormError(errors, name);

    const id = useId();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    <TextField
                        variant="outlined"
                        size="small"
                        {...rest}
                        {...field}
                        id={id}
                        autoComplete="off"
                        label={label}
                        error={hasError}
                        inputRef={field.ref}
                        onChange={(e) => {
                            if (maxLength && e.target.value.length > maxLength) return;
                            field.onChange(e);
                            onChangeValue?.(e.target.value);
                        }}
                        value={rest.value ?? field.value ?? ""}
                        sx={{
                            maxWidth: maxW,
                            minWidth: minW,
                        }}
                        InputLabelProps={{
                            size: "small",
                        }}
                        InputProps={{
                            size: "small",
                            style: {
                                height: rest.multiline ? "fit-content" : "40px",
                            },
                        }}
                    />
                    {hasError &&
                        <div className="text-[12px] font-[400] text-[#d94a4a]">
                            {errorMessage}
                        </div>
                    }
                    {!!description && (
                        <div className="text-[12px] font-[400] text-[#aeb0b3]">{description}</div>
                    )}
                </>
            )
            }
        />
    )
}

export default TextInput;