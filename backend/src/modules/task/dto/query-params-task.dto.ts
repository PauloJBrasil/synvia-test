import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryParamsTaskDto {
  take?: number;
  page?: number;
  orderBy?: string;
  direction?: 'DESC' | 'ASC' | null;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  titulo?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  data?: Date;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  descricao?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  responsavel?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  tags?: string;
}
