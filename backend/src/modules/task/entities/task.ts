import { TaskTag } from 'src/modules/tag/entities/task-tag';
import { Usuario } from 'src/modules/usuario/entities/usuario';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'titulo' })
  titulo: string;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'responsavel' })
  responsavel: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => Usuario, (usuario) => usuario.id)
  @JoinColumn({ name: 'responsavel', referencedColumnName: 'id' })
  responsavelTask: Usuario;

  @OneToMany(() => TaskTag, (taskTag) => taskTag.taskTag)
  @JoinColumn([{ name: 'id', referencedColumnName: 'task' }])
  taskTag: TaskTag[];
}
