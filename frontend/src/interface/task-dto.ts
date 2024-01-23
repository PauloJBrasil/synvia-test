export interface Task {
    createdAt: Date;
    descricao: string;
    id: string;
    responsavelTask: Responsavel;
    titulo: string;
    tags: string[];
}

interface Responsavel {
    email: string;
    id: string;
    nome: string;
}