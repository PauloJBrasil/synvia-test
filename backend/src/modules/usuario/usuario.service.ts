import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario';
import { Repository } from 'typeorm';
import { CreateUsuarioDTO } from './dto/create-usuario.dto';
import { compare, hash } from 'bcryptjs';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class UsuarioService {
  constructor(
    private readonly jwtService: JwtService,

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
    const usuario = await this.usuarioRepository.save({
      nome: body.nome,
      senha,
      email: body.email,
    });

    const payload = {
      unique_: JSON.stringify({
        email: usuario.email,
        nome: usuario.nome,
        id: usuario.id,
      }),
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: '1h',
    });

    return {
      token,
      nome: usuario.nome,
      email: usuario.email,
    };
  }

  async login(body: LoginUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email: body.email },
    });

    if (!usuario) {
      return { error: 'Usuário não encontrado' };
    }

    const senhaValida = await compare(body.senha, usuario.senha);

    if (!senhaValida) {
      return { error: 'Senha inválida' };
    }

    const payload = {
      unique_: JSON.stringify({
        email: usuario.email,
        nome: usuario.nome,
        id: usuario.id,
      }),
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET,
      expiresIn: '1h',
    });

    return {
      token,
      nome: usuario.nome,
      email: usuario.email,
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.SECRET,
      });

      return payload;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
