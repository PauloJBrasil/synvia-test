import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario';
import { Repository } from 'typeorm';
import { CreateUsuarioDTO } from './dto/create-usuario.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  getUsuarios() {
    return this.usuarioRepository.find({
      select: ['id', 'nome', 'email', 'createdAt'],
    });
  }

  getUsuario(id: string) {
    return this.usuarioRepository.findOne({
      where: { id },
      select: ['id', 'nome', 'email', 'createdAt'],
    });
  }

  async createUsuario(body: CreateUsuarioDTO) {
    const senha = await hash(body.senha, 8);
    return this.usuarioRepository.save({
      nome: body.nome,
      senha,
      email: body.email,
    });
  }
}
