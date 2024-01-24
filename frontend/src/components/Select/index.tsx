import { Controller, useFormContext } from "react-hook-form";
import { FormControl, InputLabel, Select } from "@mui/material";

const SelectForm = ({
    name,
    label,
    control,
    defaultValue,
    children,
    selected,
    ...props
}: any) => {
    const labelId = `${name}-label`;
    const methods = useFormContext();

    return (
        <FormControl {...props}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller
                name={name}
                control={methods.control}
                render={({ field }) => (
                    <Select {...field} labelId={labelId} label={label}>
                        {children}
                    </Select>
                )}
            />
        </FormControl>
    );
};

export default SelectForm;