import HttpException from "../../exceptions/http.exceptions";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  getAllEmployees = async (): Promise<Employee[]> => {
    return this.employeeRepository.find();
  };

  getEmployeeById = async (id: number): Promise<Employee> => {
    return this.employeeRepository.findOneBy({ id });
  };

  createEmployee = async (
    name: string,
    email: string,
    age: string,
    address: any
  ): Promise<Employee> => {
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailFormat)) {
      throw new HttpException(400, "Invalid email format");
      return;
    }

    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    newEmployee.age = age;

    const newAddress = new Address();
    newAddress.line1 = address.line1;
    newAddress.pincode = address.pincode;

    newEmployee.address = newAddress;

    return this.employeeRepository.save(newEmployee);
  };

  updateEmployee = async (
    id: number,
    name: string,
    email: string
  ): Promise<Employee> => {
    const newEmployee = await this.getEmployeeById(id);
    newEmployee.email = email;
    newEmployee.name = name;
    return this.employeeRepository.save(newEmployee);
  };

  delete = async (id: number): Promise<void> => {
    const newEmployee = await this.getEmployeeById(id);
    this.employeeRepository.delete(id);
  };
}

export default EmployeeService;
