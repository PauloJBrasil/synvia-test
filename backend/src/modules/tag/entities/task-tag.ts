import { Task } from 'src/modules/task/entities/task';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag';
import { Usuario } from 'src/modules/usuario/entities/usuario';

@Entity({ name: 'task-tag' })
export class TaskTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'task' })
  task: string;

  @Column({ name: 'tag' })
  tag: string;

  @Column({ name: 'usuario' })
  usuario: string;

  @ManyToOne(() => Task, (task) => task.id)
  @JoinColumn({ name: 'task', referencedColumnName: 'id' })
  taskTag: Task;

  @ManyToOne(() => Tag, (tag) => tag.id)
  @JoinColumn({ name: 'tag', referencedColumnName: 'id' })
  tagTask: Tag;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'usuario', referencedColumnName: 'id' })
  usuarioTask: Usuario;
}
