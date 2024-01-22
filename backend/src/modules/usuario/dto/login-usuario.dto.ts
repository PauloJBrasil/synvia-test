import { IsNotEmpty } from 'class-validator';

export class LoginUsuarioDTO {
  @IsNotEmpty({ message: 'Informe seu email' })
  email: string;

  @IsNotEmpty({ message: 'Informe sua senha' })
  senha: string;
}
