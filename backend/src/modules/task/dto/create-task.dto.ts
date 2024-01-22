import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  descricao: string;

  @IsOptional()
  tags: string[];

  @IsOptional()
  responsavel: string;
}
