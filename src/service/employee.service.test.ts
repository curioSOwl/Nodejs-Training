import { when } from "jest-when";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "./employee.service";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "./department.service";
import Department from "../entity/department.entity";

describe("Employee service", () => {
  let employeeRepository: EmployeeRepository;
  let employeeService: EmployeeService;
  let departmentRepository: DepartmentRepository;
  let departmentService: DepartmentService;

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };

    departmentRepository = new DepartmentRepository(
      dataSource.getRepository(Department)
    ) as jest.Mocked<DepartmentRepository>;
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;
    employeeService = new EmployeeService(
      employeeRepository,
      departmentRepository
    );
  });

  it("should return allEmployees", async () => {
    const mock = jest.fn(employeeRepository.find).mockResolvedValue([]);
    employeeRepository.find = mock;

    const users = await employeeService.getAllEmployees();
    expect(users).toEqual([]);
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should return Employees with id", async () => {
    const mock = jest.fn();
    when(mock)
      .calledWith({ id: 1 })
      .mockResolvedValue({ id: 1, name: "as" } as Employee);
    employeeRepository.findOneBy = mock;

    const users = await employeeService.getEmployeeById(1);
    expect(users.name).toEqual("as");
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
