import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
  constructor(private repository: Repository<Employee>) {}

  find = async (): Promise<Employee[]> => {
    return this.repository.find({ relations: ["address"] });
  };

  findOneBy = async (filter: Partial<Employee>): Promise<Employee> => {
    // const employeeRepository = this.dataSource.getRepository(Employee);
    return this.repository.findOne({ where: filter, relations: ["address"] });
  };

  save = async (newEmployee: Employee): Promise<Employee> => {
    // const this.repository = this.dataSource.getRepository(Employee);
    return this.repository.save(newEmployee);
  };

  softDelete = async (filter: Partial<Employee>) => {
    // const this.repository = this.dataSource.getRepository(Employee);
    return this.repository.softDelete(filter);
  };

  delete = async (id: number): Promise<void> => {
    // const this.repository = this.dataSource.getRepository(Employee);
    await this.repository.delete({ id });
  };

  softRemove = async (filter: Partial<Employee>): Promise<void> => {
    await this.repository.softRemove(filter);
  };
}

export default EmployeeRepository;
