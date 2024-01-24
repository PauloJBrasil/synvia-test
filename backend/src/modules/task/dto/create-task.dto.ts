import { IsNotEmpty, IsOptional } from 'class-validator';

class TagDTO {
  id: string;
  nameTag: string;
}

export class CreateTaskDTO {
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  descricao: string;

  @IsOptional()
  tags: TagDTO[];

  @IsOptional()
  responsavel: string;
}
