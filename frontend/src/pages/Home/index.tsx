import moment from "moment";
import { useReactQuery } from "../../hooks/useReactQuery";
import { Task } from "../../interface/task-dto";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const { response } = useReactQuery<Task[]>('/task', {
        page: 1,
        take: 16
    })

    return (
        <div className="w-full ">

            <button className="p-2 bg-[#35c949] text-white rounded" onClick={() => navigate('/task')}>Adicionar Task</button>

            <div className="sm:grid sm:grid-cols-4 gap-4 flex flex-col mt-24">
                {response?.map((task) => (
                    <div key={task.id} className="bg-white border border-[#c0c0c0] border-solid p-4 rounded">
                        <div className="text-2xl font-medium">{task.titulo}</div>
                        <div className="descricao">{task.descricao}</div>
                        <div className="data">{moment(task.createdAt).format('DD/MM/YYYY HH:mm:ss')}</div>
                        <div className="mt-2 flex gap-2">
                            {
                                task.tags?.map((tag) => (
                                    <div className="rounded border-2 border-solid border-[#f1f1f1]">{tag}</div>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;