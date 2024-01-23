import { Autocomplete, Chip, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form"
import { useHookFormError } from "../../hooks/useHookFormError";

const AutocompleteForm = ({ placeholder, name, options, loading }: any) => {
    const { control, formState } = useFormContext();

    const { errorMessage, hasError } = useHookFormError(
        formState.errors,
        name
    );

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={null}
            render={({ field }) => (
                <div>
                    <Autocomplete
                        {...field}
                        multiple
                        id="tags-filled"
                        options={options}
                        getOptionLabel={(option) => option.name}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} label={placeholder} placeholder={placeholder} />
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