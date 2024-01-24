import { Autocomplete, Chip, TextField, createFilterOptions } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form"
import { useHookFormError } from "../../hooks/useHookFormError";

const AutocompleteForm = ({ placeholder, name, options, ...rest }: any) => {
    const { control, formState } = useFormContext();
    const { errorMessage, hasError } = useHookFormError(
        formState.errors,
        name
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div>
                    <Autocomplete
                        {...field}
                        multiple
                        id="tags-filled"
                        onChange={(event, value: any) => {
                            field.onChange(value);
                        }}
                        options={options}
                        getOptionLabel={(option) => option?.name}
                        freeSolo
                        filterSelectedOptions
                        ListboxProps={{
                            style: {
                                maxHeight: "150px",
                            },
                        }}
                        renderTags={(value: readonly any[], getTagProps) =>
                            value.map((option: any, index: number) => (
                                <Chip variant="outlined" label={option.name ?? option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField {...params} {...rest} label={placeholder} placeholder={placeholder} />
                        )}
                    />
                    {hasError &&
                        <div className="text-[12px] font-[400] text-[#d94a4a]">
                            {errorMessage}
                        </div>}
                    {" "}
                </div>
            )}
        />
    )
}

export default AutocompleteForm;