import HttpException from "../../exceptions/http.exceptions";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import { Role } from "../utils/role.enum";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET, JWT_VALIDITY } from "../utils/constants";
import { jwtPayload } from "../utils/jwtPayload";

class EmployeeService {
  constructor(private employeeRepository: EmployeeRepository) {}

  getAllEmployees = async (): Promise<Employee[]> => {
    return this.employeeRepository.find();
  };

  loginEmployee = async (email: string, password: string) => {
    const employee = await this.employeeRepository.findOneBy({ email });

    if (!employee) {
      throw new HttpException(403, "Error!!! Incorrect details1");
    }

    const result = await bcrypt.compare(password, employee.password);

    if (!result) {
      throw new HttpException(403, "Error!!! Incorrect details2");
    }

    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

    const token = jsonwebtoken.sign(payload, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });
    return { token };
  };

  getEmployeeById = async (id: number): Promise<Employee> => {
    return this.employeeRepository.findOneBy({ id });
  };

  createEmployee = async (
    name: string,
    email: string,
    age: number,
    password: string,
    role: Role,
    address: any
  ): Promise<Employee> => {
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailFormat)) {
      throw new HttpException(400, "Invalid email format");
    }

    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    newEmployee.age = age;
    newEmployee.role = role;
    newEmployee.password = password ? await bcrypt.hash(password, 10) : "";
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
    this.employeeRepository.softRemove(newEmployee);
  };
}

export default EmployeeService;
