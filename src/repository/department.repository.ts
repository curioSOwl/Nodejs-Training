import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
  constructor(private repository: Repository<Department>) {}

  find = async (): Promise<Department[]> => {
    return this.repository.find({ relations: { employees: true } });
  };

  findOneBy = async (filter: Partial<Department>): Promise<Department> => {
    return this.repository.findOne({
      where: filter,
      relations: { employees: true },
    });
  };

  save = async (newDepartment: Department): Promise<Department> => {
    return this.repository.save(newDepartment);
  };

  softDelete = async (filter: Partial<Department>) => {
    return this.repository.softDelete(filter);
  };

  delete = async (id: number): Promise<void> => {
    await this.repository.delete({ id });
  };

  softRemove = async (filter: Partial<Department>): Promise<void> => {
    await this.repository.softRemove(filter);
  };
}

export default DepartmentRepository;
