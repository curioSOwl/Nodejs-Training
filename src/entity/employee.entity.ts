import { Column, Entity, OneToOne } from "typeorm";
import AbstractEntity from "./abstract-entity";
import Address from "./address.entity";

@Entity()
class Employee extends AbstractEntity {
  @Column()
  name: String;

  @Column()
  age: String;

  @Column()
  email: String;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  address: Address;
}

export default Employee;
