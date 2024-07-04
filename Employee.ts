import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Employee;
