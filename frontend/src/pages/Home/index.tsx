import moment from "moment";
import { useReactQuery } from "../../hooks/useReactQuery";
import { PaginationTask, Task } from "../../interface/task-dto";
import { useNavigate } from "react-router-dom";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import { FormControl, MenuItem, Pagination } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import SelectForm from "../../components/Select";
import { FormDatePicker } from "../../components/DatePicker";
import AutocompleteForm from "../../components/Autocomplete";

const Home = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const form = useForm();

    const { response, refetch } = useReactQuery<PaginationTask>('/task', {
        page: page,
        take: 10,
        titulo: form.watch('titulo'),
        descricao: form.watch('descricao'),
        responsavel: form.watch('responsavel'),
        tags: form.watch('tags'),
        data: form.watch('data') ? form.watch('data') : undefined
    })

    const { response: responseUsuarios } = useReactQuery<any>('/usuario')

    const { response: responseTag } = useReactQuery<any>('/tag')

    const editTask = (id: string) => {
        navigate(`/task/${id}`)
    }

    const removeTask = (id: string) => {
        api.delete('/task/' + id).then(() => {
            toast.success('Task removida com sucesso!')
            refetch()
        })
            .catch((err) => {
                console.log(err)
                toast.error('Erro ao remover task!')
            })
    }

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <div className="w-full ">

            <button className="p-2 mb-2 bg-[#35c949] text-white rounded" onClick={() => navigate('/task')}>Adicionar Task</button>

            <FormProvider {...form}>
                <div className="text-2xl font-medium mb-4">Filtros</div>
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <TextInput className="w-full" name="titulo" label={"Titulo"} placeholder="Filtrar por Titulo" />
                    <TextInput className="w-full" name="descricao" label={"Descrição"} placeholder="Filtrar por Descrição" />
                    <SelectForm className="w-full h-10 [&>label]:top-[-6px] [&>div]:h-10" name="responsavel" label="Responsável">
                        {responseUsuarios?.map((usuario: any) => (
                            <MenuItem key={usuario.id} value={usuario.id}>{usuario.nome}</MenuItem>
                        ))}
                    </SelectForm>
                    <AutocompleteForm className="w-full min-w-40 h-10" name="tags" label="Tags" placeholder="Tags"
                        options={responseTag?.map((tag: any) => { return { name: tag.nomeTag, value: tag.id } })} />
                    <FormDatePicker className="w-full h-10 [&>label]:top-[-6px] [&>div]:h-10" name="data" label="Data" />
                </div>
            </FormProvider>

            <div className="sm:grid sm:grid-cols-4 gap-4 flex flex-col mt-12">
                {response?.data?.map((task) => (
                    <div key={task.id} className="bg-white border border-[#c0c0c0] border-solid p-4 rounded">
                        <div className="flex justify-between align-top">
                            <div className="text-2xl font-medium">{task.titulo}</div>
                            <div className="flex gap-2">
                                <PencilSimple className="cursor-pointer" size={24} color="#300F72" onClick={() => editTask(task.id)} />
                                <TrashSimple className="cursor-pointer" size={24} color="#300F72" onClick={() => removeTask(task.id)} />
                            </div>
                        </div>
                        <div className="descricao">{task.descricao}</div>
                        <div className="data">{moment(task.createdAt).format('DD/MM/YYYY HH:mm:ss')}</div>
                        <div className="mt-2 flex gap-2">
                            {
                                task.taskTag?.map((taskTag) => (
                                    <div className="rounded border-2 border-solid border-[#55e083] p-1">{taskTag.tagTask.nomeTag}</div>
                                ))
                            }
                        </div>
                        {
                            task.responsavelTask?.nome && (
                                <div className="mt-2">
                                    <div className="font-medium mt-2">Responsável</div>
                                    <div>{task.responsavelTask?.nome}</div>
                                </div>
                            )
                        }
                    </div>
                ))}
            </div>

            <div className="flex w-full justify-center items-center mt-6">
                <Pagination
                    count={response?.total_pages}
                    shape="rounded"
                    sx={{ alignSelf: 'center' }}
                    page={page}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    )
}

export default Home;