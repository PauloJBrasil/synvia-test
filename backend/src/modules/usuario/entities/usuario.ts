import { Task } from 'src/modules/task/entities/task';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'senha' })
  senha: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
