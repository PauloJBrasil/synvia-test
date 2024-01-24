import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./validation/task-form";
import { useReactQuery } from "../../hooks/useReactQuery";
import AutocompleteForm from "../../components/Autocomplete";
import SelectForm from "../../components/Select";
import { MenuItem } from "@mui/material";
import { TextIndent } from "phosphor-react";
import TextInput from "../../components/TextInput";
import TextArea from "../../components/TextArea";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";

const Task = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const form = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: {
            responsavel: ''
        }
    })

    const { response } = useReactQuery<any>('/usuario')

    const { response: responseTag, isLoading } = useReactQuery<any>('/tag')

    const getTask = useCallback(() => {
        api.get(`/task/${id}`).then((response) => {
            form.setValue('titulo', response.data.titulo)
            form.setValue('descricao', response.data.descricao)
            form.setValue('responsavel', response.data.responsavelTask?.id)
            form.setValue('tags', response.data.taskTag.map((tag: any) => {
                return {
                    name: tag.tagTask.nomeTag,
                    value: tag.tagTask.id
                }
            }))
        }).catch((error) => {
            console.log(error)
            toast.error('Ocorreu um erro ao buscar a task, tente novamente mais tarde')
        })
    }, [id])

    useEffect(() => {
        if (id) getTask();
    }, [id, getTask])

    const submit = () => {
        const tags = form.getValues('tags').map((tag: any) => {
            return {
                id: tag?.value || null,
                nameTag: tag?.name ?? tag
            }
        })

        const apiTask = id ? api.put : api.post

        apiTask(id ? `/task/${id}` : '/task', {
            titulo: form.getValues('titulo'),
            descricao: form.getValues('descricao'),
            responsavel: form.getValues('responsavel'),
            tags
        }).then((response) => {
            toast.success('Task criada com sucesso')
            navigate('/')
        }).catch((error) => {
            toast.error('Ocorreu um erro ao criar a task, tente novamente mais tarde')
        })
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-8 w-full sm:w-1/2 bg-white border-[#dadada] border-solid border-1 border rounded">
                <div className="flex flex-col gap-6">
                    <h4 className="font-600 text-center text-2xl">Criar Task</h4>
                    <FormProvider {...form}>
                        <div className="flex flex-col gap-3">
                            <TextInput name="titulo" label="Titulo" placeholder="Digite o título da task" />
                            <TextArea name="descricao" label="Descrição" placeholder="Descrição da task" />
                            {!isLoading && (<AutocompleteForm name="tags" label="Tags" placeholder="Tags" options={responseTag.map((tag: any) => { return { name: tag.nomeTag, value: tag.id } })} />)}
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
            </div >
        </div >
    )
}

export default Task;