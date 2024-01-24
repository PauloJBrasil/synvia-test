export interface PaginationTask {
    count: number;
    data: Task[];
    total_pages: number
}

export interface Task {
    createdAt: Date;
    descricao: string;
    id: string;
    responsavelTask: Responsavel;
    titulo: string;
    taskTag: TaskTag[];
}

export interface TaskTag {
    createdAt: Date;
    id: string;
    tag: string;
    task: string;
    usuario: string;
    tagTask: TagTask;
}

interface TagTask {
    createdAt: Date;
    id: string;
    nomeTag: string
}
interface Responsavel {
    email: string;
    id: string;
    nome: string;
}