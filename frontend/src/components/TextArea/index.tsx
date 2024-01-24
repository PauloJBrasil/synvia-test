import { TextField, TextFieldProps } from "@mui/material";
import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useHookFormError } from "../../hooks/useHookFormError";

type TextAreaProps = TextFieldProps & {
    name: string;
    label: string;
    description?: string;
    maxW?: string;
    onChangeValue?: (value: string) => void;
    maxLength?: number;
};

const TextArea = ({
    name,
    label,
    description,
    maxLength,
    onChangeValue,
    maxW,
    ...rest
}: TextAreaProps) => {

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
                <TextField
                    variant="outlined"
                    size="small"
                    minRows={4}
                    multiline
                    type="text"
                    {...rest}
                    {...field}
                    id={id}
                    label={label}
                    helperText={errorMessage ?? description}
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
                        width: "100%",
                        minWidth: "200px",
                    }}
                    InputLabelProps={{
                        size: "small",
                    }}
                    InputProps={{
                        sx: {
                            resize: "vertical",
                        },
                    }}
                />
            )}
        />
    )
}

export default TextArea;