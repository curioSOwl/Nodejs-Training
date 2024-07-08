import HttpException from "../../exceptions/http.exceptions";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService {
  constructor(private departmentRepository: DepartmentRepository) {}

  getAllDepartments = async (): Promise<Department[]> => {
    return this.departmentRepository.find();
  };

  getDepartmentById = async (id: number): Promise<Department> => {
    return this.departmentRepository.findOneBy({ id });
  };

  createDepartment = async (name: string): Promise<Department> => {
    const newDepartment = new Department();
    newDepartment.name = name;

    return this.departmentRepository.save(newDepartment);
  };

  updateDepartment = async (id: number, name: string): Promise<Department> => {
    const newDepartment = await this.getDepartmentById(id);
    newDepartment.name = name;

    return this.departmentRepository.save(newDepartment);
  };

  delete = async (id: number): Promise<Department> => {
    const newDepartment = await this.getDepartmentById(id);
    if (newDepartment.employees.length !== 0) {
      throw new HttpException(400, "no employees should be present");
    }
    this.departmentRepository.softRemove(newDepartment);
    return newDepartment;
  };
}

export default DepartmentService;
