import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Group } from './group.entity';
import { University } from './university.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @ManyToOne(() => Group, (group) => group.students, { onDelete: 'CASCADE' })
  group: Group;

  @ManyToOne(() => University, (university) => university.students, {
    onDelete: 'CASCADE',
  })
  university: University;
}
