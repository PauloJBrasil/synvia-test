import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDTO } from './dto/create-usuario.dto';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  getUsuarios() {
    return this.usuarioService.getUsuarios();
  }

  @Get('/:id')
  getUsuario(@Param('id') id: string) {
    return this.usuarioService.getUsuario(id);
  }

  @Post()
  createUsuario(@Body() body: CreateUsuarioDTO) {
    return this.usuarioService.createUsuario(body);
  }

  @Post('/login')
  login(@Body() body: LoginUsuarioDTO) {
    return this.usuarioService.login(body);
  }

  @Post('/validate-token')
  validateToken(@Body() body: { token: string }) {
    return this.usuarioService.validateToken(body.token);
  }
}
