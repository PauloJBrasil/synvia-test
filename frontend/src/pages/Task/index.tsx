import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./validation/task-form";
import { useReactQuery } from "../../hooks/useReactQuery";
import AutocompleteForm from "../../components/Autocomplete";
import SelectForm from "../../components/Select";
import { MenuItem } from "@mui/material";

const Task = () => {

    const form = useForm<any>({
        resolver: yupResolver(schema)
    })

    const { response, isLoading } = useReactQuery<any>('/usuario')

    const submit = () => {
        console.log(form.getValues())
    }

    console.log(form.watch())

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-8 w-full sm:w-1/2 bg-white border-[#dadada] border-solid border-1 border rounded">
                <div className="flex flex-col gap-6">
                    <h4 className="font-600 text-center text-2xl">Criar Task</h4>
                    <FormProvider {...form}>
                        <div className="flex flex-col gap-3">
                            <input className="w-full rounded border-2 px-2 focus:outline-none h-10" {...form.register('titulo')} name="email" type="text" placeholder="Titulo" />
                            <textarea rows={4} className="w-full rounded border-2 px-2 focus:outline-none" {...form.register('descricao')} name="senha" placeholder="Descrição" />
                            <input className="w-full rounded border-2 px-2 focus:outline-none h-10" {...form.register('tags')} name="email" type="text" placeholder="Tags utilizar (,)" />
                            <SelectForm name="responsavel" label="Responsável">
                                {response?.map((usuario: any) => (
                                    <MenuItem key={usuario.id} value={usuario.id}>{usuario.nome}</MenuItem>
                                ))}
                            </SelectForm>
                        </div>
                    </FormProvider>
                    <div className="flex gap-3 justify-end">
                        <button className="w-32 h-8 rounded text-[#fafafa] px-2 bg-[#35c949]" type="submit" onClick={() => submit()}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task;