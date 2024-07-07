import { when } from "jest-when";
import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "./employee.service";

describe("Employee service", () => {
  let employeeRepository: EmployeeRepository;
  let employeeService: EmployeeService;

  beforeAll(() => {
    const dataSource = {
      getRepository: jest.fn(),
    };
    employeeRepository = new EmployeeRepository(
      dataSource.getRepository(Employee)
    ) as jest.Mocked<EmployeeRepository>;
    employeeService = new EmployeeService(employeeRepository);
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
