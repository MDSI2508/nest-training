import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './student.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity()
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.university)
  students: Student[];

  @OneToMany(() => Group, (group) => group.university)
  groups: Group[];
}
