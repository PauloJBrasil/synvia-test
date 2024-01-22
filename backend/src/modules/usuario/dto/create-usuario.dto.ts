import { IsNotEmpty } from 'class-validator';

export class CreateUsuarioDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'Senha é obrigatório' })
  senha: string;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;
}
