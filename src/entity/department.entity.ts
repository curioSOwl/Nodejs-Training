
import { Entity, Column, OneToMany } from 'typeorm';
import Employee from './employee.entity';
import AbstractEntity from './abstract-entity';

@Entity()
export class Department extends AbstractEntity{
  @Column({ type: 'int', generated: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}