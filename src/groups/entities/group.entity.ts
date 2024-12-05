import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { University } from '../../students/entities/university.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  groupName: string;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @ManyToOne(() => University, (university) => university.groups, {
    onDelete: 'CASCADE',
  })
  university: University;
}
